import "source-map-support/register";

import { ResponseType } from "src/types";
import S3ManagementService from "src/services/s3-management-service";
import { winstonLogger } from "@libs/winstonLogger";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";

export const importFileParser = async (
  event,
  _context
): Promise<ResponseType> => {
  winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

  const objectKeys: string[] = event.Records.map(
    (record) => record.s3.object.key
  );

  try {
    const response = await S3ManagementService.moveFiles(objectKeys);

    winstonLogger.logRequest(`!!response: ${JSON.stringify(response)}`);

    return formatSuccessResponse(response);
  } catch (err) {
    return formatErrorResponse(err);
  }
};
