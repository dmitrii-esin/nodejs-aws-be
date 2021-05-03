import "source-map-support/register";

import { S3Event, APIGatewayEvent, Context } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import { ResponseType } from "src/types";
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

  const s3 = new S3({ region: "eu-west-1" });
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const catalogPath = `uploaded/${fileName}`;

  const params = {
    Bucket: BUCKET_NAME,
    Key: catalogPath,
    Expires: 60,
    ContentType: "text/csv",
  };

  try {
    const s3Response = await s3.getSignedUrlPromise("putObject", params);

    winstonLogger.logRequest(
      `!!importProductsFile: ${JSON.stringify({ result: s3Response })}`
    );

    return formatSuccessResponse({ result: s3Response });
  } catch (err) {
    return formatErrorResponse(err);
  }
};
