import { Context } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { importFileParser } from "./handler";

const PARAMS = {
  event: {},
  context: {} as Context,
  callback: undefined,
};

describe("lambda importFileParser", () => {
  it("lambda photoList runs corretly", async () => {
    const result = await importFileParser(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
