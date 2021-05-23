import "source-map-support/register";

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

      const products: Product[] = event.Records.map((record: SQSRecord) =>
        JSON.parse(record.body)
      );

      //TODO: type
      const result = await productService.catalogBatchProcess(products);

      winstonLogger.logRequest(`!!Created products: ${JSON.stringify(result)}`);

      return formatSuccessResponse(result);
    } catch (err) {
      return formatErrorResponse(err);
    }
  };
