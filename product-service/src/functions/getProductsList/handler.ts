import "source-map-support/register";

import type {
  ValidatedEventAPIGatewayProxyEvent,
  APIGatewayProxyEventDefault,
} from "@libs/apiGateway";
import { formatJSONResponse, formatJSONError } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { normalizeJsonAsArray } from "@libs/jsonParser";
import * as data from "@db/product-list.json";

export const getProductsList:
  | ValidatedEventAPIGatewayProxyEvent<never>
  | any = async (event: APIGatewayProxyEventDefault) => {
  try {
    const normalizedData = await normalizeJsonAsArray(data);

    return formatJSONResponse({
      data: normalizedData,
      event,
    });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(getProductsList);
