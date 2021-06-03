export enum STATUS_MESSAGES {
  SUCCESS = "SUCCESS",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG",
}

export const statusCodesMap = {
  [STATUS_MESSAGES.SUCCESS]: 200,
  [STATUS_MESSAGES.BAD_REQUEST]: 400,
  [STATUS_MESSAGES.NOT_FOUND]: 404,
  [STATUS_MESSAGES.SOMETHING_WENT_WRONG]: 500,
};

export const DEFAULT_ERROR_CODE =
  statusCodesMap[STATUS_MESSAGES.SOMETHING_WENT_WRONG];
export const DEFAULT_SUCCESS_STATUS = statusCodesMap[STATUS_MESSAGES.SUCCESS];

export const DEFAULT_HEADERS = {
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
};
