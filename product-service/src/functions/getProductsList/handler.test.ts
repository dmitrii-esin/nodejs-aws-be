import { Context } from "aws-lambda";
import { getProductsList } from "./handler";

const MOCK_PARAMS = {
  event: {},
  context: {
    awsRequestId: "9e8a207c-1f99-4b9b-a413-02beb6250895",
    invokeid: "id",
    logGroupName: "/aws/lambda/product-service-dev-getProductsList",
    logStreamName: "2015/09/22/[HEAD]13370a84ca4ed8b77c427af260",
    functionVersion: "HEAD",
    invokedFunctionArn: "123",
    isDefaultFunctionVersion: true,
    functionName: "product-service-dev-getProductsList",
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

describe("lambda getProductsList", () => {
  it("lambda getProductsList runs corretly", async () => {
    const result = await getProductsList(
      MOCK_PARAMS.event,
      MOCK_PARAMS.context,
      MOCK_PARAMS.callback
    );

    expect(result.statusCode).toBe(200);
  });
});
