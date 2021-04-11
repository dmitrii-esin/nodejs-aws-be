import "source-map-support/register";

import { middyfy } from "@libs/lambda";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType, Product } from "src/types";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { getProductById as getProductByIdService } from "src/services";

export const getProductById: (
  event,
  _context
) => Promise<ResponseType> = async (event, _context) => {
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

    const product: Product = await getProductByIdService(id);

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

export const main = middyfy(getProductById);
