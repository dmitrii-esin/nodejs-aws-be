import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

export interface APIGatewayProxyEventDefault extends APIGatewayProxyEvent {}

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export interface Error {
  code: number;
  message: string;
}

const CORSHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: CORSHeaders,
    body: JSON.stringify(response),
  };
};

export const formatJSONError = (error: Error) => {
  return {
    statusCode: error.code,
    headers: {
      ...CORSHeaders,
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code,
    },
    isBase64Encoded: false,
    body: `${error.code} : ${error.message}`,
  };
};
