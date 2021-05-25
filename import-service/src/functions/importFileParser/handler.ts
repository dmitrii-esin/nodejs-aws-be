import "source-map-support/register";

import { ResponseType, Product } from "src/types";
import { S3EventRecord, S3Event, Context } from "aws-lambda";
import SQS from "aws-sdk/clients/sqs";
import S3ManagementService from "src/services/s3-management-service";
import SQSManagementService from "src/services/sqs-management-service";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";

export const importFileParser = async (
  event: S3Event,
  _context: Context
): Promise<ResponseType> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  const objectKeys: string[] = event.Records.map(
    (record: S3EventRecord) => record.s3.object.key
  );

  try {
    const products: Product[] = await S3ManagementService.moveFiles(objectKeys);
    const sqsSendMessagesResult: SQS.SendMessageResult[] =
      await SQSManagementService.sendProductsToQueue(products);

    winstonLogger.logRequest(`!!Products: ${JSON.stringify(products)}`);
    winstonLogger.logRequest(
      `!!SqsSendMessagesResult: ${JSON.stringify(sqsSendMessagesResult)}`
    );

    return formatSuccessResponse();
  } catch (err) {
    return formatErrorResponse(err);
  }
};
