import "source-map-support/register";

import { APIGatewayEvent, Context } from "aws-lambda";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType } from "src/types";

export const basicAuthorizer = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<ResponseType> => {
  try {
    winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

    const originalPass = process.env.GITHUB_LOGIN;

    console.log("!!originalPass", originalPass);

    const result = true;

    winstonLogger.logRequest(`!!isAuthorized: ${JSON.stringify(result)}`);

    return formatSuccessResponse();
  } catch (err) {
    return formatErrorResponse(err);
  }
};
