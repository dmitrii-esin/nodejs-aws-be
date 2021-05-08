import "source-map-support/register";

import { ResponseType } from "src/types";
import S3ManagementService from "src/services/s3-management-service";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";

export const importProductsFile = async (
  event,
  _context
): Promise<ResponseType> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  const fileName = event?.queryStringParameters?.name || "";

  if (!fileName) {
    return formatSuccessResponse(
      null,
      statusCodesMap[STATUS_MESSAGES.BAD_REQUEST],
      STATUS_MESSAGES.BAD_REQUEST
    );
  }

  try {
    const response = await S3ManagementService.generateSignedUrl(fileName);

    winstonLogger.logRequest(`!!response: ${JSON.stringify(response)}`);

    return formatSuccessResponse(response);
  } catch (err) {
    return formatErrorResponse(err);
  }
};
