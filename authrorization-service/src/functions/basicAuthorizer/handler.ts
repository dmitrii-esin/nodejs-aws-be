import "source-map-support/register";

import {
  APIGatewayAuthorizerCallback,
  APIGatewayRequestAuthorizerEvent,
  APIGatewayAuthorizerResult,
  APIGatewayAuthorizerResultContext,
  PolicyDocument,
  APIGatewayEventRequestContext,
} from "aws-lambda";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType } from "src/types";

export const basicAuthorizer = async (
  event: APIGatewayRequestAuthorizerEvent,
  _context: APIGatewayEventRequestContext,
  cb: APIGatewayAuthorizerCallback
  // ): Promise<APIGatewayAuthorizerResult> => {
): Promise<void> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  if (event["type"] != "REQUEST") cb("Unauthorized");

  try {
    const encodedCreds = event.queryStringParameters.token;

    const buff = Buffer.from(encodedCreds, "base64");
    const plainCreds = buff.toString("utf-8").split(":");
    const [username, password] = plainCreds;

    console.log("!!username, password", username, password);

    const storedUserPassword = process.env[username];
    const effect =
      !storedUserPassword || storedUserPassword != password ? "Deny" : "Allow";

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    cb(null, policy);

    winstonLogger.logRequest(`!!policy: ${JSON.stringify(policy)}`);

    // return formatSuccessResponse();
  } catch (err) {
    cb("Unauthorized", err.message);
    // return formatErrorResponse(err);
  }
};

const generatePolicy = (
  principalId: string,
  resource: string | string[],
  effect = "Allow"
): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};
