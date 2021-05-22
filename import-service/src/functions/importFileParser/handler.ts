import "source-map-support/register";

import { ResponseType, Product } from "src/types";
import { S3EventRecord, S3Event, Context } from "aws-lambda";
import S3ManagementService from "src/services/s3-management-service";
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

    //TODO:!!!! types
    const response2: any[] = await S3ManagementService.sendProductsToQueue(
      products
    );

    winstonLogger.logRequest(`!!products: ${JSON.stringify(products)}`);
    winstonLogger.logRequest(
      `!!sendProductsToQueue response: ${JSON.stringify(response2)}`
    );

    //return {
    //   statusCode: 200,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //}

    return formatSuccessResponse(products);
  } catch (err) {
    return formatErrorResponse(err);
  }
};
