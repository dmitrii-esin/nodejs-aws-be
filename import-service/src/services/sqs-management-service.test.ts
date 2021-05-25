import SQS from "aws-sdk/clients/sqs";
import { SQSManagementService } from "@services/sqs-management-service";

describe("SQSManagementService", () => {
  const PARAMS = {
    sqs: {} as SQS,
  };

  let sqsManagementService = null;

  beforeEach(() => {
    sqsManagementService = new SQSManagementService(PARAMS.sqs);

    sqsManagementService.sendProductsToQueue = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([]));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();

    sqsManagementService = null;
  });

  it("sendProductsToQueue runs correctly", async () => {
    const result = await sqsManagementService.sendProductsToQueue([
      "1",
      "2",
      "3",
    ]);

    expect(result).toMatchObject([]);
  });
});
