import { Context } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { getProductById } from "./handler";

const MOCK_PARAMS = {
  context: {
    awsRequestId: "1a66805d-48b3-4f6d-b078-01135f76a3e3",
    invokeid: "id",
    logGroupName: "/aws/lambda/product-service-dev-getProductById",
    logStreamName: "2015/09/22/[HEAD]13370a84ca4ed8b77c427af260",
    functionVersion: "HEAD",
    invokedFunctionArn: "123",
    isDefaultFunctionVersion: true,
    functionName: "product-service-dev-getProductById",
    memoryLimitInMB: "1024",
    callbackWaitsForEmptyEventLoop: false,
    identity: {
      cognitoIdentityId: "test-id",
      cognitoIdentityPoolId: "test-id",
    },
    clientContext: {
      client: {
        installationId: "1",
        appTitle: "1",
        appVersionName: "1",
        appVersionCode: "2",
        appPackageName: "3",
      },
      env: {
        platformVersion: "1",
        platform: "1",
        make: "1",
        model: "1",
        locale: "1",
      },
    },
    getRemainingTimeInMillis: () => 1,
    done: jest.fn(),
    fail: jest.fn(),
    succeed: jest.fn(),
  } as Context,
  callback: undefined,
};

const MOCK_PARAMS_WITH_CORRECT_PRODUCT_ID = {
  ...MOCK_PARAMS,
  event: {
    pathParameters: { id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
  },
};

const MOCK_PARAMS_WITH_NON_EXISTENT_PRODUCT_ID = {
  ...MOCK_PARAMS,
  event: { pathParameters: { id: "123" } },
};

const MOCK_PARAMS_WITHOUT_PRODUCT_ID = {
  ...MOCK_PARAMS,
  event: { pathParameters: { id: "" } },
};

describe("lambda getProductById", () => {
  it("lambda getProductById with correct id runs corretly", async () => {
    const result = await getProductById(
      MOCK_PARAMS_WITH_CORRECT_PRODUCT_ID.event,
      MOCK_PARAMS_WITH_CORRECT_PRODUCT_ID.context
    );

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});

describe("lambda getProductById", () => {
  it("lambda getProductById with non-existent id runs corretly", async () => {
    const result = await getProductById(
      MOCK_PARAMS_WITH_NON_EXISTENT_PRODUCT_ID.event,
      MOCK_PARAMS_WITH_NON_EXISTENT_PRODUCT_ID.context
    );

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.NOT_FOUND]);
  });
});

describe("lambda getProductById", () => {
  it("lambda getProductById without id runs corretly", async () => {
    const result = await getProductById(
      MOCK_PARAMS_WITHOUT_PRODUCT_ID.event,
      MOCK_PARAMS_WITHOUT_PRODUCT_ID.context
    );

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.BAD_REQUEST]);
  });
});
