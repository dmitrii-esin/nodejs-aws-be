import { Readable } from "stream";
import S3 from "aws-sdk/clients/s3";
import SQS from "aws-sdk/clients/sqs";
import csv from "csv-parser";
import { CustomError } from "src/customError";
import { Product } from "src/types";

interface S3ManagementServiceInterface {
  generateSignedUrl: (objectKey: string) => Promise<string>;
  moveFiles: (objectKeys: string[]) => Promise<Product[]>;
  sendProductsToQueue: (products: any[]) => Promise<any[]>;
}
export class S3ManagementService implements S3ManagementServiceInterface {
  private bucketName: string;
  private s3: S3;
  private sqsClient: SQS;

  constructor(bucketName: string, s3: S3, sqsClient: SQS) {
    this.bucketName = bucketName;
    this.s3 = s3;
    this.sqsClient = sqsClient;
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

  //TODO: types
  //TODO: move to another service
  async sendProductsToQueue(products: Product[]): Promise<any> {
    try {
      //TODO: types
      let results: any[] = [];

      for (const product of products) {
        //TODO: types
        const result = await this.sqsClient
          .sendMessage({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(product),
          })
          .promise();

        results.push(result);
      }

      return results;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  async moveFiles(objectKeys: string[]): Promise<Product[]> {
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
            //TODO: add validation for the products
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
      return results.flat() as Product[];
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }
}

export default new S3ManagementService(
  process.env.BUCKET_NAME,
  //TODO: move to env vars
  new S3({ region: "eu-west-1", signatureVersion: "v4" }),
  new SQS()
);
