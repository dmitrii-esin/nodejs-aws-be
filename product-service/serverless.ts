import type { AWS } from "@serverless/typescript";

import getProductsList from "@functions/getProductsList";
import getProductById from "@functions/getProductById";
import getWeatherInfo from "@functions/getWeatherInfo";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    documentation: {
      version: 1,
      title: "metal-tickets-store-api",
      description: "metal tickets store api",
      models: {},
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "default",
    stage: "dev",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { getProductsList, getProductById, getWeatherInfo },
};

module.exports = serverlessConfiguration;
