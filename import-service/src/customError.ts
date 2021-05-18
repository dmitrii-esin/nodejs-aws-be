import {
  statusCodesMap,
  DEFAULT_ERROR_CODE,
  STATUS_MESSAGES,
} from "./constants";

type Code = Values<typeof statusCodesMap>;

export class CustomError extends Error {
  success: boolean;
  message: string;
  code: Code;

  constructor({
    code = DEFAULT_ERROR_CODE,
    message = STATUS_MESSAGES.SOMETHING_WENT_WRONG,
  }: {
    code?: Code;
    message?: string;
  }) {
    super();
    this.success = false;
    this.message = message;
    this.code = code;
  }
}
