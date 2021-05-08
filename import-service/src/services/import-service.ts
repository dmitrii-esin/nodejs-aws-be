import { Readable } from "stream";
import S3 from "aws-sdk/clients/s3";
import csv from "csv-parser";
import { CustomError } from "src/customError";

export const importService = {
  generateSignedUrl: async (objectKey: string): Promise<string> => {
    const s3 = new S3({
      region: "eu-west-1",
      signatureVersion: "v4",
    });

    const BUCKET_NAME = process.env.BUCKET_NAME;
    const catalogPath = `uploaded/${objectKey}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: catalogPath,
      Expires: 60,
      ContentType: "text/csv",
    };

    try {
      const s3Response = await s3.getSignedUrlPromise("putObject", params);

      return s3Response;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  },
  moveFiles: async (objectKeys: string[]) => {
    const s3 = new S3({ region: "eu-west-1" });
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const results = [];

    const moveFile = async (
      copyParams: S3.Types.CopyObjectRequest,
      deleteParams: S3.Types.DeleteObjectRequest
    ): Promise<void> => {
      try {
        await s3.copyObject(copyParams).promise();
        await s3.deleteObject(deleteParams).promise();
      } catch (error) {
        const { code, message, stack } = error;

        throw new CustomError({ code, message });
      }
    };

    const promises = objectKeys.map((objectKey) => {
      return new Promise((resolve, reject) => {
        const getParams: S3.Types.GetObjectRequest = {
          Bucket: BUCKET_NAME,
          Key: objectKey,
        };

        const s3Stream: Readable = s3.getObject(getParams).createReadStream();

        s3Stream
          .pipe(csv())
          .on("data", (data) => {
            results.push(data);
          })
          .on("error", (err) => {
            reject(err);
          })
          .on("end", async () => {
            const copyParams: S3.Types.CopyObjectRequest = {
              Bucket: BUCKET_NAME,
              CopySource: `${BUCKET_NAME}/${objectKey}`,
              Key: objectKey.replace("uploaded", "parsed"),
            };

            const deleteParams: S3.Types.DeleteObjectRequest = {
              Bucket: BUCKET_NAME,
              Key: objectKey,
            };

            await moveFile(copyParams, deleteParams);

            resolve(results);
          });
      });
    });

    try {
      const results = await Promise.all(promises);

      return results;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  },
};
