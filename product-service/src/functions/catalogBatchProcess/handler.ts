import "source-map-support/register";

import SNS from "aws-sdk/clients/sns";
import { SQSRecord, SQSEvent, Context } from "aws-lambda";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { Product, ProductServiceInterface, ResponseType } from "src/types";

export const catalogBatchProcess =
  (productService: ProductServiceInterface) =>
  async (event: SQSEvent, _context: Context): Promise<ResponseType> => {
    try {
      winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

      const products: string[] = event.Records.map(
        (record: SQSRecord) => record.body
      );

      console.log("!!catalogBatchProcess lambda products", products);

      //TODO:!!! type
      const result = await productService.catalogBatchProcess(
        // JSON.parse(products)
        products
      );

      winstonLogger.logRequest(`!!Created products: ${JSON.stringify(result)}`);

      // return {
      //   statusCode: 202,
      // };

      return formatSuccessResponse(result);
    } catch (err) {
      return formatErrorResponse(err);
    }
  };
