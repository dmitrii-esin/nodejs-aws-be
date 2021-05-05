import "source-map-support/register";

import { Context } from "aws-lambda";
import { ResponseType } from "src/types";
import { importService } from "src/services/import-service";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";

export const importProductsFile = async (
  event,
  _context: Context
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
    const response = await importService.generateSignedUrl(fileName);

    winstonLogger.logRequest(`!!response: ${JSON.stringify(response)}`);

    return formatSuccessResponse(response);
  } catch (err) {
    return formatErrorResponse(err);
  }
};
