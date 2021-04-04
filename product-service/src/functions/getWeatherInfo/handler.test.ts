import { Context } from "aws-lambda";
import { main } from "./handler";

//TODO: fix test config

const MOCK_PARAMS = {
  event: "",
  context: {
    awsRequestId: "45e5a6bb-275c-4e24-8368-769a5711c383",
    invokeid: "id",
    logGroupName: "/aws/lambda/product-service-dev-getWeatherInfo",
    logStreamName: "2015/09/22/[HEAD]13370a84ca4ed8b77c427af260",
    functionVersion: "HEAD",
    invokedFunctionArn: "123",
    isDefaultFunctionVersion: true,
    functionName: "product-service-dev-getWeatherInfo",
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
    done: () => {},
    fail: (error) => {},
    succeed: (messageOrObject) => {},
  } as Context,
  callback: undefined,
};

const MOCK_RESULT = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: '{"data":{"weather":"rainy"},"event":""}',
};

describe("lambda getWeatherInfo", () => {
  it("lambda getWeatherInfo runs corretly", async () => {
    expect(
      main(MOCK_PARAMS.event, MOCK_PARAMS.context, MOCK_PARAMS.callback)
    ).toBe(MOCK_RESULT);
  });
});
