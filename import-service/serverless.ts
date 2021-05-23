import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "2",
  custom: {
    s3BucketArn: "arn:aws:s3:::csv-store-1",
    s3BucketName: "csv-store-1",
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    remover: {
      prompt: false,
      buckets: ["${self:custom.s3BucketName}"],
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-offline",
    "serverless-s3-remover",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "default",
    stage: "${opt:stage, 'dev'}",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      ENV_STAGE: "${opt:stage, 'dev'}",
      SQS_URL: "${cf:product-service-dev.SqsUrl}",
    },
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "s3:ListBucket",
            Resource: "${self:custom.s3BucketArn}",
          },
          {
            Effect: "Allow",
            Action: "s3:*",
            Resource: "${self:custom.s3BucketArn}" + "/*",
          },
          {
            Effect: "Allow",
            Action: "sqs:SendMessage",
            Resource: "${cf:product-service-dev.SqsArn}",
          },
        ],
      },
    },
  },
  functions: {
    importProductsFile: {
      handler: "handler.importProductsFile",
      events: [
        {
          http: {
            method: "get",
            path: "import",
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  name: true,
                },
              },
            },
          },
        },
      ],
    },
    importFileParser: {
      handler: "handler.importFileParser",
      events: [
        {
          s3: {
            bucket: "${self:custom.s3BucketName}",
            event: "s3:ObjectCreated:*",
            rules: [
              {
                prefix: "uploaded/",
              },
            ],
            existing: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
