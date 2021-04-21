import "source-map-support/register";

import { Product, ProductServiceInterface, ResponseType } from "src/types";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";

export const createProductHandler = (
  productService: ProductServiceInterface
) => async (event, _context): Promise<ResponseType> => {
  try {
    winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

    const product: Product = await productService.create(event.body);

    winstonLogger.logRequest(`!!Created product: ${JSON.stringify(product)}`);

    return formatSuccessResponse(product);
  } catch (err) {
    return formatErrorResponse(err);
  }
};
