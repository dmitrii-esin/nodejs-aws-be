import { APIGatewayEvent, Context } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { InMemoryProductService } from "src/services/in-memory-product-service";
import { getProductById } from "./handler";

const PARAMS = {
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

const BASE_EVENT = {
  event: {
    body: "",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.26.10",
      Accept: "*/*",
      "Cache-Control": "no-cache",
      "Postman-Token": "",
      Host: "localhost:3000",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Content-Length": "225",
    },
    httpMethod: "",
    isBase64Encoded: false,
    multiValueHeaders: {
      "Content-Type": ["application/json"],
      "User-Agent": ["PostmanRuntime/7.26.10"],
      Accept: ["*/*"],
      "Cache-Control": ["no-cache"],
      "Postman-Token": [""],
      Host: ["localhost:3000"],
      "Accept-Encoding": ["gzip, deflate, br"],
      Connection: ["keep-alive"],
      "Content-Length": ["225"],
    },
    multiValueQueryStringParameters: null,
    path: "/products",
    pathParameters: null,
    queryStringParameters: null,
    requestContext: {
      accountId: "offlineContext_accountId",
      apiId: "offlineContext_apiId",
      authorizer: { principalId: "offlineContext_authorizer_principalId" },
      domainName: "offlineContext_domainName",
      domainPrefix: "offlineContext_domainPrefix",
      extendedRequestId: "cknugrm4g0000l8ow6amm19kr",
      httpMethod: "",
      identity: {
        accessKey: null,
        accountId: "offlineContext_accountId",
        apiKey: "offlineContext_apiKey",
        apiKeyId: "offlineContext_apiKeyId",
        caller: "offlineContext_caller",
        cognitoAuthenticationProvider:
          "offlineContext_cognitoAuthenticationProvider",
        cognitoAuthenticationType: "offlineContext_cognitoAuthenticationType",
        cognitoIdentityId: "offlineContext_cognitoIdentityId",
        cognitoIdentityPoolId: "offlineContext_cognitoIdentityPoolId",
        principalOrgId: null,
        sourceIp: "127.0.0.1",
        user: "offlineContext_user",
        userAgent: "PostmanRuntime/7.26.10",
        userArn: "offlineContext_userArn",
      },
      path: "/products",
      protocol: "HTTP/1.1",
      requestId: "cknugrm4g0001l8ow5jk0fb42",
      requestTime: "23/Apr/2021:18:23:43 +0300",
      requestTimeEpoch: 1619191423144,
      resourceId: "offlineContext_resourceId",
      resourcePath: "/dev/products",
      stage: "dev",
    },
    resource: "/products",
    stageVariables: null,
  } as APIGatewayEvent,
};

const PARAMS_WITH_CORRECT_PRODUCT_ID = {
  ...PARAMS,
  event: {
    ...BASE_EVENT.event,
    pathParameters: { id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
  } as APIGatewayEvent,
};

const PARAMS_WITH_NON_EXISTENT_PRODUCT_ID = {
  ...PARAMS,
  event: {
    ...BASE_EVENT.event,
    pathParameters: { id: "123" },
  } as APIGatewayEvent,
};

const PARAMS_WITHOUT_PRODUCT_ID = {
  ...PARAMS,
  event: { ...BASE_EVENT.event, pathParameters: { id: "" } } as APIGatewayEvent,
};

describe("lambda getProductById", () => {
  it("lambda getProductById with correct id runs corretly", async () => {
    const productService = new InMemoryProductService();
    const connectedGetProductById = getProductById(productService);

    const result = await connectedGetProductById(
      PARAMS_WITH_CORRECT_PRODUCT_ID.event,
      PARAMS_WITH_CORRECT_PRODUCT_ID.context
    );

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});

describe("lambda getProductById", () => {
  it("lambda getProductById with non-existent id runs corretly", async () => {
    const productService = new InMemoryProductService();
    const connectedGetProductById = getProductById(productService);

    const result = await connectedGetProductById(
      PARAMS_WITH_NON_EXISTENT_PRODUCT_ID.event,
      PARAMS_WITH_NON_EXISTENT_PRODUCT_ID.context
    );

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.NOT_FOUND]);
  });
});

describe("lambda getProductById", () => {
  it("lambda getProductById without id runs corretly", async () => {
    const productService = new InMemoryProductService();
    const connectedGetProductById = getProductById(productService);

    const result = await connectedGetProductById(
      PARAMS_WITHOUT_PRODUCT_ID.event,
      PARAMS_WITHOUT_PRODUCT_ID.context
    );

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.BAD_REQUEST]);
  });
});
