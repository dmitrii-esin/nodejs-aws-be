import "source-map-support/register";

import { APIGatewayEvent, Context } from "aws-lambda";
import { Product, ProductServiceInterface, ResponseType } from "src/types";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";

export const createProduct =
  (productService: ProductServiceInterface) =>
  async (event: APIGatewayEvent, _context: Context): Promise<ResponseType> => {
    try {
      winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

      const product: Product = await productService.create(
        JSON.parse(event.body)
      );

      winstonLogger.logRequest(`!!Created product: ${JSON.stringify(product)}`);

      return formatSuccessResponse(product);
    } catch (err) {
      return formatErrorResponse(err);
    }
  };
