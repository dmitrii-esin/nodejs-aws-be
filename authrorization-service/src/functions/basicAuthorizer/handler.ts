import "source-map-support/register";

import {
  APIGatewayRequestAuthorizerEvent,
  APIGatewayAuthorizerResult,
  CustomAuthorizerCallback,
} from "aws-lambda";
import { winstonLogger } from "@libs/winstonLogger";

export const basicAuthorizer = async (
  event: APIGatewayRequestAuthorizerEvent,
  _context,
  cb: CustomAuthorizerCallback
): Promise<void | APIGatewayAuthorizerResult> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  if (event.type !== "REQUEST") {
    cb("Unauthorized");
    return;
  }

  try {
    const encodedCreds = event.headers["Authorization"].split(" ")[1];
    const buff = Buffer.from(encodedCreds, "base64");
    const plainCreds = buff.toString("utf-8").split(":");
    const [username, password] = plainCreds;

    if (!username || !password) {
      cb("Unauthorized");
      return;
    }

    const storedUserPassword = process.env.APP_PASSWORD;

    const effect =
      !storedUserPassword || storedUserPassword != password ? "Deny" : "Allow";

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    winstonLogger.logRequest(`!!Policy: ${JSON.stringify(policy)}`);

    cb(null, policy);
  } catch (err) {
    winstonLogger.logRequest(`!!Error: ${JSON.stringify(err)}`);

    cb("Unauthorized", err.message);
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
