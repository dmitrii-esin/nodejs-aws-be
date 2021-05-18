import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { importProductsFile } from "./handler";

const PARAMS = {
  event: {
    queryStringParameters: {
      name: "superfile.csv",
    },
  },
  context: {},
  callback: undefined,
};

describe("test lambda importProductsFile with S3ManagementService", () => {
  beforeEach(() => {
    jest.resetModules();

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("S3", "putObject", (params, callback) => {
      callback(null, "");
    });
    AWSMock.mock("S3", "getSignedUrlPromise", (method, params, callback) => {
      callback(null, "");
    });
  });

  afterEach(() => {
    AWSMock.restore("S3");
  });

  it("lambda runs corretly", async () => {
    const result = await importProductsFile(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
