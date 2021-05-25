import { Context, S3Event } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import S3ManagementService from "src/services/s3-management-service";
import SQSManagementService from "src/services/sqs-management-service";
import { importFileParser } from "./handler";

const PARAMS = {
  event: {
    Records: [
      {
        s3: {
          object: {
            key: "https://test-url.com/uploaded",
          },
        },
      },
    ],
  } as S3Event,
  context: {} as Context,
  callback: undefined,
};

describe("lambda importFileParser without S3ManagementService and SQSManagementService", () => {
  beforeEach(() => {
    S3ManagementService.moveFiles = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ statusCode: 200 }));

    SQSManagementService.sendProductsToQueue = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ statusCode: 200 }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it("lambda runs corretly", async () => {
    const result = await importFileParser(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
