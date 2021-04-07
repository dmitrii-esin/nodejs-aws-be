import "source-map-support/register";

import type { APIGatewayProxyEventDefault } from "@libs/apiGateway";
import { formatJSONResponse, formatJSONError } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

const fetchData = () => Promise.resolve({ weather: "rainy" });

export const getWeatherInfo = async (
  event: APIGatewayProxyEventDefault
): Promise<any> => {
  try {
    const result = await fetchData();
    return formatJSONResponse({ data: result, event });
  } catch (error) {
    return formatJSONError(error);
  }
};

export const main = middyfy(getWeatherInfo);
