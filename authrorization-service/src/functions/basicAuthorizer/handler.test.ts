import { APIGatewayEvent, Context } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { basicAuthorizer } from "./handler";

const PARAMS = {
  event: {} as APIGatewayEvent,
  context: {} as Context,
};

describe("lambda basicAuthorizer", () => {
  // beforeEach(() => {
  //   notificationService.notify = jest
  //     .fn()
  //     .mockImplementationOnce(() => Promise.resolve({ statusCode: 200 }));
  // });

  // afterEach(() => {
  //   jest.restoreAllMocks();
  //   jest.resetAllMocks();
  // });

  it("lambda runs corretly", async () => {
    const result = await basicAuthorizer(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
