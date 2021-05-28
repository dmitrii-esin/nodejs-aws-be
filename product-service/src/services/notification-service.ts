import SNS from "aws-sdk/clients/sns";
import { NotificationServiceInterface, Product } from "src/types";
import { checkProductValidity } from "@libs/productValidator";
import { CustomError } from "src/customError";

class NotificationService implements NotificationServiceInterface {
  constructor(private snsClient: SNS) {}

  async notify(createdProducts: Product[]): Promise<SNS.PublishResponse[]> {
    let results: SNS.PublishResponse[] = [];

    for (const createdProduct of createdProducts) {
      try {
        const { error } = checkProductValidity(createdProduct);

        if (error) {
          const result = await this.snsClient
            .publish({
              Subject: "You are invited",
              Message: JSON.stringify(createdProduct),
              TopicArn: process.env.SNS_ARN,
              MessageAttributes: {
                status: {
                  DataType: "String",
                  StringValue: "failure",
                },
              },
            })
            .promise();
          results.push(result);
        }

        if (!error) {
          const result = await this.snsClient
            .publish({
              Subject: "You are invited",
              Message: JSON.stringify(createdProduct),
              TopicArn: process.env.SNS_ARN,
              MessageAttributes: {
                status: {
                  DataType: "String",
                  StringValue: "success",
                },
              },
            })
            .promise();
          results.push(result);
        }
      } catch (error) {
        const { code, message, stack } = error;
        throw new CustomError({ code, message });
      }
    }

    return results;
  }
}

export { NotificationService };
