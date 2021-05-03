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
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";

export const importFileParser = async (
  event,
  _context
): Promise<ResponseType> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  const s3 = new S3({ region: "eu-west-1" });
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const results = [];

  const promises = event.Records.map((record) => {
    const params: S3.Types.GetObjectRequest = {
      Bucket: BUCKET_NAME,
      Key: record.s3.object.key,
    };

    const s3Stream: Readable = s3.getObject(params).createReadStream();

    s3Stream
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);

        winstonLogger.logRequest(`!!Handle data: ${JSON.stringify(data)}`);
      })
      .on("error", (err) => {
        winstonLogger.logRequest(`!!Handle error: ${JSON.stringify(err)}`);

        return formatSuccessResponse(
          null,
          statusCodesMap[STATUS_MESSAGES.SOMETHING_WENT_WRONG],
          STATUS_MESSAGES.SOMETHING_WENT_WRONG
        );
      })
      .on("end", (end) => {
        winstonLogger.logRequest(`!!Handle end: ${JSON.stringify(end)}`);
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
