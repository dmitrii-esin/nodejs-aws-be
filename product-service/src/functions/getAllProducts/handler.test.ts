import { Context, APIGatewayEvent } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { InMemoryProductService } from "src/services/in-memory-product-service";
import { getAllProducts } from "./handler";

const PARAMS = {
  event: {} as APIGatewayEvent,
  context: {
    awsRequestId: "9e8a207c-1f99-4b9b-a413-02beb6250895",
    invokeid: "id",
    logGroupName: "/aws/lambda/product-service-dev-getAllProducts",
    logStreamName: "2015/09/22/[HEAD]13370a84ca4ed8b77c427af260",
    functionVersion: "HEAD",
    invokedFunctionArn: "123",
    isDefaultFunctionVersion: true,
    functionName: "product-service-dev-getAllProducts",
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

describe("lambda getAllProducts", () => {
  it("lambda getAllProducts runs corretly", async () => {
    const productService = new InMemoryProductService();
    const connectedGetAllProducts = getAllProducts(productService);

    const result = await connectedGetAllProducts(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
