import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "authrorization-service",
  frameworkVersion: "2",
  custom: {
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
      APP_PASSWORD: "${env:APP_PASSWORD, ''}",
    },
    lambdaHashingVersion: "20201221",
  },
  resources: {
    Outputs: {
      basicAuthorizer: {
        Value: {
          "Fn::GetAtt": "BasicAuthorizerLambdaFunction.Arn",
        },
        Export: {
          Name: "basicAuthorizer",
        },
      },
    },
  },
  functions: {
    basicAuthorizer: {
      handler: "handler.basicAuthorizer",
    },
  },
};

module.exports = serverlessConfiguration;
