import { Context } from "aws-lambda";
import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { importProductsFile } from "./handler";

//TODO: fix

const PARAMS = {
  event: {
    resource: "/import",
    path: "/import",
    httpMethod: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "CloudFront-Forwarded-Proto": "https",
      "CloudFront-Is-Desktop-Viewer": "true",
      "CloudFront-Is-Mobile-Viewer": "false",
      "CloudFront-Is-SmartTV-Viewer": "false",
      "CloudFront-Is-Tablet-Viewer": "false",
      "CloudFront-Viewer-Country": "RU",
      Host: "nr3xtj1l4g.execute-api.eu-west-1.amazonaws.com",
      origin: "http://localhost:3000",
      pragma: "no-cache",
      Referer: "http://localhost:3000/",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
      Via: "2.0 3a0e1d5f608bda83df3702e1cc449b6a.cloudfront.net (CloudFront)",
      "X-Amz-Cf-Id": "wjg189jOoCgWv2hRAiQ2sNgCXpw0xsIeIDjT1aGWkrxUvB2_P4joiA==",
      "X-Amzn-Trace-Id": "Root=1-608fde39-14d4325e7ef3b5435570a48d",
      "X-Forwarded-For": "185.44.13.36, 130.176.89.84",
      "X-Forwarded-Port": "443",
      "X-Forwarded-Proto": "https",
    },
    multiValueHeaders: {
      Accept: ["application/json, text/plain, */*"],
      "Accept-Encoding": ["gzip, deflate, br"],
      "Accept-Language": ["en-US,en;q=0.9"],
      "cache-control": ["no-cache"],
      "CloudFront-Forwarded-Proto": ["https"],
      "CloudFront-Is-Desktop-Viewer": ["true"],
      "CloudFront-Is-Mobile-Viewer": ["false"],
      "CloudFront-Is-SmartTV-Viewer": ["false"],
      "CloudFront-Is-Tablet-Viewer": ["false"],
      "CloudFront-Viewer-Country": ["RU"],
      Host: ["nr3xtj1l4g.execute-api.eu-west-1.amazonaws.com"],
      origin: ["http://localhost:3000"],
      pragma: ["no-cache"],
      Referer: ["http://localhost:3000/"],
      "sec-ch-ua": [
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      ],
      "sec-ch-ua-mobile": ["?0"],
      "sec-fetch-dest": ["empty"],
      "sec-fetch-mode": ["cors"],
      "sec-fetch-site": ["cross-site"],
      "User-Agent": [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
      ],
      Via: ["2.0 3a0e1d5f608bda83df3702e1cc449b6a.cloudfront.net (CloudFront)"],
      "X-Amz-Cf-Id": [
        "wjg189jOoCgWv2hRAiQ2sNgCXpw0xsIeIDjT1aGWkrxUvB2_P4joiA==",
      ],
      "X-Amzn-Trace-Id": ["Root=1-608fde39-14d4325e7ef3b5435570a48d"],
      "X-Forwarded-For": ["185.44.13.36, 130.176.89.84"],
      "X-Forwarded-Port": ["443"],
      "X-Forwarded-Proto": ["https"],
    },
    queryStringParameters: {
      name: "superfileeee.csv",
    },
    multiValueQueryStringParameters: {
      name: ["superfileeee.csv"],
    },
    pathParameters: null,
    stageVariables: null,
    requestContext: {
      resourceId: "85fk05",
      resourcePath: "/import",
      httpMethod: "GET",
      extendedRequestId: "ev-pAHojjoEF5gg=",
      requestTime: "03/May/2021:11:27:53 +0000",
      path: "/dev/import",
      accountId: "102883801257",
      protocol: "HTTP/1.1",
      stage: "dev",
      domainPrefix: "nr3xtj1l4g",
      requestTimeEpoch: 1620041273574,
      requestId: "5a8e9855-137c-413a-953d-3fe71c5abfdc",
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: "185.44.13.36",
        principalOrgId: null,
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
        user: null,
      },
      domainName: "nr3xtj1l4g.execute-api.eu-west-1.amazonaws.com",
      apiId: "nr3xtj1l4g",
    },
    body: null,
    isBase64Encoded: false,
  },
  context: {} as Context,
  callback: undefined,
};

beforeAll(async (done) => {
  //get requires env vars
  done();
});

beforeEach(() => {
  AWSMock.setSDKInstance(AWS);

  AWSMock.mock("S3", "getSignedUrlPromise", {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: {
      message: "SUCCESS",
      data:
        "https://csv-store-1.s3.eu-west-1.amazonaws.com/uploaded/superfile.csv?AWSAccessKeyId=AKIARP5C2HCUTA5FXTUD&Content-Type=text%2Fcsv&Expires=1620059807&Signature=HnC0FzgIK4KLaW%2FepAQ%2B7ECMzd4%3D",
    },
  });
});

afterEach(() => {
  AWSMock.restore();
});

describe("lambda importProductsFile", () => {
  it("lambda runs corretly", async () => {
    const result = await importProductsFile(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
