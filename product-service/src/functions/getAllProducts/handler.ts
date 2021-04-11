import "source-map-support/register";

import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { middyfy } from "@libs/lambda";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType, Product } from "src/types";
import { getAllProducts as getAllProductsService } from "src/services";

export const getAllProducts: (
  event,
  _context
) => Promise<ResponseType> = async (event, _context) => {
  try {
    winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

    const products: Product[] = await getAllProductsService();

    winstonLogger.logRequest(
      `"!!Received products: ${JSON.stringify(products)}`
    );

    return formatSuccessResponse(products);
  } catch (error) {
    return formatErrorResponse(error);
  }
};

export const main = middyfy(getAllProducts);
