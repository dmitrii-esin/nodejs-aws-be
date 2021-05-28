import SQS from "aws-sdk/clients/sqs";
import { CustomError } from "src/customError";
import { Product } from "src/types";

interface SQSManagementServiceInterface {
  sendProductsToQueue: (products: any[]) => Promise<SQS.SendMessageResult[]>;
}
export class SQSManagementService implements SQSManagementServiceInterface {
  private sqsClient: SQS;

  constructor(sqsClient: SQS) {
    this.sqsClient = sqsClient;
  }

  async sendProductsToQueue(
    products: Product[]
  ): Promise<SQS.SendMessageResult[]> {
    try {
      let results: SQS.SendMessageResult[] = [];

      for (const product of products) {
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
}

export default new SQSManagementService(new SQS());
