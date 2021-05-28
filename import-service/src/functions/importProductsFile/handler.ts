import "source-map-support/register";

import { Context, APIGatewayEvent } from "aws-lambda";
import { ResponseType } from "src/types";
import S3ManagementService from "src/services/s3-management-service";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";

export const importProductsFile = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<ResponseType> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  const fileName: string = event?.queryStringParameters?.name || "";

  if (!fileName) {
    return formatSuccessResponse(
      null,
      statusCodesMap[STATUS_MESSAGES.BAD_REQUEST],
      STATUS_MESSAGES.BAD_REQUEST
    );
  }

  try {
    const signedUrl: string = await S3ManagementService.generateSignedUrl(
      fileName
    );

    winstonLogger.logRequest(`!!SignedUrl: ${JSON.stringify(signedUrl)}`);

    return formatSuccessResponse(signedUrl);
  } catch (err) {
    return formatErrorResponse(err);
  }
};
