import "source-map-support/register";

import { SQSRecord, SQSEvent, Context } from "aws-lambda";
import SNS from "aws-sdk/clients/sns";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import {
  Product,
  ProductServiceInterface,
  NotificationServiceInterface,
  ResponseType,
} from "src/types";

export const catalogBatchProcess =
  (
    productService: ProductServiceInterface,
    notificationService: NotificationServiceInterface
  ) =>
  async (event: SQSEvent, _context: Context): Promise<ResponseType> => {
    try {
      winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

      const products: Product[] = event.Records.map((record: SQSRecord) =>
        JSON.parse(record.body)
      );

      const createdProducts: Product[] = await productService.createBatch(
        products
      );
      const sendedNotifications: SNS.PublishResponse[] =
        await notificationService.notify(createdProducts);

      winstonLogger.logRequest(
        `!!Created products: ${JSON.stringify(sendedNotifications)}`
      );

      winstonLogger.logRequest(
        `!!Sended notifications: ${JSON.stringify(sendedNotifications)}`
      );

      return formatSuccessResponse();
    } catch (err) {
      return formatErrorResponse(err);
    }
  };
