import "source-map-support/register";

import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType, Product, ProductServiceInterface } from "src/types";

export const getAllProducts: (
  productService: ProductServiceInterface
) => (event, _context) => Promise<ResponseType> = (
  productService: ProductServiceInterface
) => async (event, _context) => {
  try {
    winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

    const products: Product[] = await productService.getAllProducts();

    winstonLogger.logRequest(
      `"!!Received products: ${JSON.stringify(products)}`
    );

    return formatSuccessResponse(products);
  } catch (error) {
    return formatErrorResponse(error);
  }
};
