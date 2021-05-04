import "source-map-support/register";

import { Readable } from "stream";
import csv from "csv-parser";
import S3 from "aws-sdk/clients/s3";
import { ResponseType } from "src/types";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { CustomError } from "src/customError";

export const importFileParser = async (
  event,
  _context
): Promise<ResponseType> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  const s3 = new S3({ region: "eu-west-1" });
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const results = [];

  const moveObject = async (
    copyParams: S3.Types.CopyObjectRequest,
    deleteParams: S3.Types.DeleteObjectRequest
  ) => {
    try {
      await s3.copyObject(copyParams).promise();
      await s3.deleteObject(deleteParams).promise();
    } catch (error) {
      const { code, message, stack } = error;

      throw new CustomError({ code, message });
    }
  };

  const promises = event.Records.map((record) => {
    return new Promise((resolve, reject) => {
      const getParams: S3.Types.GetObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: record.s3.object.key,
      };

      const s3Stream: Readable = s3.getObject(getParams).createReadStream();

      s3Stream
        .pipe(csv())
        .on("data", (data) => {
          results.push(data);
          winstonLogger.logRequest(`!!Handle data: ${JSON.stringify(data)}`);
        })
        .on("error", (err) => {
          winstonLogger.logRequest(`!!Handle error: ${JSON.stringify(err)}`);
          reject(err);
        })
        .on("end", async (end) => {
          winstonLogger.logRequest(`!!Handle end: ${JSON.stringify(end)}`);
          winstonLogger.logRequest(
            `!!Handle end, results: ${JSON.stringify(results)}`
          );

          const copyParams: S3.Types.CopyObjectRequest = {
            Bucket: BUCKET_NAME,
            CopySource: `${BUCKET_NAME}/parsed`,
            Key: record.s3.object.key,
          };

          const deleteParams: S3.Types.DeleteObjectRequest = {
            Bucket: BUCKET_NAME,
            Key: record.s3.object.key,
          };

          await moveObject(copyParams, deleteParams);

          resolve(results);
        });
    });
  });

  try {
    const results = await Promise.all(promises);

    winstonLogger.logRequest(`!!Results: ${JSON.stringify(results)}`);

    return formatSuccessResponse(results);
  } catch (err) {
    return formatErrorResponse(err);
  }
};
