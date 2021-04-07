import "source-map-support/register";

import type {
  ValidatedEventAPIGatewayProxyEvent,
  APIGatewayProxyEventDefault,
} from "@libs/apiGateway";
import { formatJSONResponse, formatJSONError } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { normalizeJsonAsArray } from "@libs/jsonParser";
import { Product } from "@domain/product";
import * as data from "@db/product-list.json";

export const getProductById:
  | ValidatedEventAPIGatewayProxyEvent<never>
  | any = async (event: APIGatewayProxyEventDefault) => {
  try {
    const normalizedData: Product[] = await normalizeJsonAsArray(data);
    const currentProductId = event.pathParameters.id;

    const currentProduct: Product = normalizedData.find(
      (ticket: Product) => ticket.id === currentProductId
    );

    if (!currentProduct) {
      return formatJSONError({
        code: 404,
        message: `Product with id: ${currentProductId} is not found`,
      });
    }

    return formatJSONResponse({
      data: currentProduct,
      event,
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(getProductById);
