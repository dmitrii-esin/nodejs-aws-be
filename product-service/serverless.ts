import type { AWS } from "@serverless/typescript";

import getAllProducts from "@functions/getAllProducts";
import getProductById from "@functions/getProductById";

const serverlessConfiguration: AWS = {
  service: "product-service",
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
    "serverless-s3-remover",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "default",
    stage: "${opt:stage}",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      ENV_STAGE: "${opt:stage}",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: {
    getAllProducts,
    getProductById,
  },
};

module.exports = serverlessConfiguration;
