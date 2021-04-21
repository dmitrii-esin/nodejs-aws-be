import "source-map-support/register";

import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType, Product, ProductServiceInterface } from "src/types";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";

export const getProductById: (
  productService: ProductServiceInterface
) => (event, _context) => Promise<ResponseType> = (
  productService: ProductServiceInterface
) => async (event, _context) => {
  try {
    winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

    const { id = "" } = event.pathParameters;

    if (!id) {
      return formatSuccessResponse(
        null,
        statusCodesMap[STATUS_MESSAGES.BAD_REQUEST],
        STATUS_MESSAGES.BAD_REQUEST
      );
    }

    const product: Product = await productService.getProductById(id);

    winstonLogger.logRequest(
      `!!Received product with id: ${id}: ${JSON.stringify(product)}`
    );

    if (!product) {
      return formatSuccessResponse(
        null,
        statusCodesMap[STATUS_MESSAGES.NOT_FOUND],
        STATUS_MESSAGES.NOT_FOUND
      );
    }

    return formatSuccessResponse(product);
  } catch (error) {
    return formatErrorResponse(error);
  }
};
