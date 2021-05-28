import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { Context, APIGatewayEvent } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { importProductsFile } from "./handler";

const PARAMS = {
  event: {
    body: null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: "httpMethod",
    isBase64Encoded: false,
    path: "path",
    pathParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: "accountId",
      apiId: "apiId",
      authorizer: null,
      protocol: "protocol",
      httpMethod: "httpMethod",
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: "sourceIp",
        user: null,
        userAgent: null,
        userArn: null,
      },
      path: "path",
      stage: "stage",
      requestId: "requestId",
      requestTimeEpoch: 1,
      resourceId: "resourceId",
      resourcePath: "resourcePath",
    },
    resource: "resource",
    queryStringParameters: {
      name: "superfile.csv",
    },
  } as APIGatewayEvent,
  context: {} as Context,
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
