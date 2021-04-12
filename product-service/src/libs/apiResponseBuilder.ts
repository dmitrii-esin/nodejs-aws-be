import { winstonLogger } from "./winstonLogger";
import { ResponseType } from "src/types";
import { CustomError } from "src/customError";
import {
  STATUS_MESSAGES,
  DEFAULT_HEADERS,
  DEFAULT_ERROR_CODE,
  DEFAULT_SUCCESS_STATUS,
} from "src/constants";

const formatErrorResponse = (
  error: CustomError,
  statusCode: number = DEFAULT_ERROR_CODE,
  message: string = STATUS_MESSAGES.SOMETHING_WENT_WRONG
): ResponseType => {
  winstonLogger.logError(`!!Error: ${error.message}`);

  return {
    statusCode,
    headers: {
      ...DEFAULT_HEADERS,
      "Content-Type": "text/plain",
      "x-amzn-ErrorType": error.code || DEFAULT_ERROR_CODE,
    },
    body: JSON.stringify({
      message: error.message || message,
      data: null,
    }),
  };
};

const formatSuccessResponse = (
  body: Object,
  statusCode: number = DEFAULT_SUCCESS_STATUS,
  message: string = STATUS_MESSAGES.SUCCESS
): ResponseType => {
  winstonLogger.logRequest(`!!Lambda successfully invoked and finished`);

  return {
    statusCode,
    headers: {
      ...DEFAULT_HEADERS,
    },
    body: JSON.stringify({
      message,
      data: body,
    }),
  };
};

export { formatErrorResponse, formatSuccessResponse };
