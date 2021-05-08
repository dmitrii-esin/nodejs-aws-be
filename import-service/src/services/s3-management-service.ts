import { Readable } from "stream";
import S3 from "aws-sdk/clients/s3";
import csv from "csv-parser";
import { CustomError } from "src/customError";

export class S3ManagementService {
  private bucketName: string;
  private s3: S3;

  constructor(bucketName: string, s3: S3) {
    this.bucketName = bucketName;
    this.s3 = s3;
  }

  private async moveFile(
    copyParams: S3.Types.CopyObjectRequest,
    deleteParams: S3.Types.DeleteObjectRequest
  ): Promise<void> {
    try {
      await this.s3.copyObject(copyParams).promise();
      await this.s3.deleteObject(deleteParams).promise();
    } catch (error) {
      const { code, message, stack } = error;

      throw new CustomError({ code, message });
    }
  }

  async generateSignedUrl(objectKey: string): Promise<string> {
    const catalogPath = `uploaded/${objectKey}`;

    const params = {
      Bucket: this.bucketName,
      Key: catalogPath,
      Expires: 60,
      ContentType: "text/csv",
    };

    try {
      const s3Response = await this.s3.getSignedUrlPromise("putObject", params);

      return s3Response;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  async moveFiles(objectKeys: string[]): Promise<unknown[]> {
    const results = [];

    const promises = objectKeys.map((objectKey) => {
      return new Promise((resolve, reject) => {
        const getParams: S3.Types.GetObjectRequest = {
          Bucket: this.bucketName,
          Key: objectKey,
        };

        const s3Stream: Readable = this.s3
          .getObject(getParams)
          .createReadStream();

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
              Bucket: this.bucketName,
              CopySource: `${this.bucketName}/${objectKey}`,
              Key: objectKey.replace("uploaded", "parsed"),
            };

            const deleteParams: S3.Types.DeleteObjectRequest = {
              Bucket: this.bucketName,
              Key: objectKey,
            };

            await this.moveFile(copyParams, deleteParams);

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
  }
}

export default new S3ManagementService(
  process.env.BUCKET_NAME,
  new S3({ region: "eu-west-1", signatureVersion: "v4" })
);
