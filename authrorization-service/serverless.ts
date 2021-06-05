import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "authrorization-service",
  frameworkVersion: "2",
  custom: {
    basicAuthorizer: {
      "Fn::GetAtt": ["basicAuthorizer", "Arn"],
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-offline",
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
    },
    lambdaHashingVersion: "20201221",
    // iam: {
    //   role: {
    //     statements: [
    //       {
    //         Effect: "Allow",
    //         Action: "sqs:*",
    //         Resource: [
    //           {
    //             "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
    //           },
    //         ],
    //       },
    //       {
    //         Effect: "Allow",
    //         Action: "sns:*",
    //         Resource: {
    //           Ref: "createProductTopic",
    //         },
    //       },
    //     ],
    //   },`
    // },
  },
  resources: {
    Outputs: {
      basicAuthorizer: {
        Value: "${self:custom.basicAuthorizer}",
        Export: {
          Name: "basicAuthorizer",
        },
      },
    },
  },
  functions: {
    basicAuthorizer: {
      handler: "handler.basicAuthorizer",
      // events: [
      //   {
      //     http: {
      //       method: "post",
      //       path: "products",
      //       cors: true,
      //       request: {
      //         schema: {
      //           "application/json":
      //             "${file(src/schemas/createProductSchema.json)}",
      //         },
      //       },
      //     },
      //   },
      // ],
    },
  },
};

module.exports = serverlessConfiguration;
