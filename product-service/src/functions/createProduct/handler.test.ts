import { APIGatewayEvent, Context } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { InMemoryProductService } from "src/services/in-memory-product-service";
import { createProduct } from "./handler";

const PARAMS = {
  event: {
    body: '{\r\n    "count": 17736884,\r\n    "date": "cillum aliquip minim",\r\n    "description": "Duis sunt",\r\n    "image": "aute sit minim",\r\n    "location": "in",\r\n    "price": 40831755,\r\n    "title": "adipisicing eu aliquip occaecat"\r\n}',
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.26.10",
      Accept: "*/*",
      "Cache-Control": "no-cache",
      "Postman-Token": "9a29b9c8-8d69-4d08-995f-4d2c7f2dbc92",
      Host: "localhost:3000",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Content-Length": "225",
    },
    httpMethod: "POST",
    isBase64Encoded: false,
    multiValueHeaders: {
      "Content-Type": ["application/json"],
      "User-Agent": ["PostmanRuntime/7.26.10"],
      Accept: ["*/*"],
      "Cache-Control": ["no-cache"],
      "Postman-Token": ["9a29b9c8-8d69-4d08-995f-4d2c7f2dbc92"],
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
      httpMethod: "POST",
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
  context: {
    awsRequestId: "cknugrm4j0002l8owh57583r2",
    callbackWaitsForEmptyEventLoop: true,
    clientContext: null,
    functionName: "product-service-dev-createProductHandler",
    functionVersion: "$LATEST",
    invokedFunctionArn:
      "offline_invokedFunctionArn_for_product-service-dev-createProductHandler",
    logGroupName:
      "offline_logGroupName_for_product-service-dev-createProductHandler",
    logStreamName:
      "offline_logStreamName_for_product-service-dev-createProductHandler",
    memoryLimitInMB: "1024",
  } as Context,
  callback: undefined,
};

describe("lambda createProduct", () => {
  it("lambda createProduct runs corretly", async () => {
    const productService = new InMemoryProductService();
    const connectedCreateProduct = createProduct(productService);

    const result = await connectedCreateProduct(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
