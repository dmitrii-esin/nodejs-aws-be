import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      //TODO:!!! проверить, если не пбудет работать то просто заимпортить
      // dotenvVars: "${file(configs.js)}",
      dotenvVars: "./configs.js",
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
      PGHOST: "${self:custom.dotenvVars.PGHOST, env:PGHOST, 'kokoko'}",
      PGPORT: "${self:custom.dotenvVars.PGPORT, env:PGPORT, 'kokoo'}",
      PGUSER: "${self:custom.dotenvVars.PGUSER, env:PGUSER, 'kokoko'}",
      PGPASSWORD:
        "${self:custom.dotenvVars.PGPASSWORD, env:PGPASSWORD, 'kokoko'}",
      PGDATABASE:
        "${self:custom.dotenvVars.PGDATABASE, env:PGDATABASE, 'kokoko'}",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: {
    getAllProducts: {
      handler: "handler.connectedGetAllProducts",
      events: [
        {
          http: {
            method: "get",
            path: "products",
            cors: true,
          },
        },
      ],
    },
    getProductById: {
      handler: "handler.connectedGetProductById",
      events: [
        {
          http: {
            method: "get",
            path: "products/{id}",
            cors: true,
            request: {
              parameters: {
                paths: {
                  id: true,
                },
              },
            },
          },
        },
      ],
    },
    createProductHandler: {
      handler: "handler.connectedCreateProduct",
      events: [
        {
          http: {
            method: "post",
            path: "products",
            cors: true,
            request: {
              schema: {
                "application/json": "./src/schemas/createProductSchema.json",
              },
            },
          },
        },
      ],
    },
    migrateSchema: {
      handler: "handler.connectedMigrateSchema",
      events: [
        {
          http: {
            method: "get",
            path: "migrate",
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
