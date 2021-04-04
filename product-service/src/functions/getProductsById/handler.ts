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

const getProductsById: ValidatedEventAPIGatewayProxyEvent<never> | any = async (
  event: APIGatewayProxyEventDefault
) => {
  try {
    const normalizedData = normalizeJsonAsArray(data);

    const currentProduct: Product =
      normalizedData.find(
        (ticket: Product) => ticket.id === event.pathParameters.id
      ) || "Product not found";

    return formatJSONResponse({
      data: currentProduct,
      event,
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(getProductsById);
