import type { AWS } from "@serverless/typescript";

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
    "serverless-dotenv-plugin",
  ],
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "cvs-sqs",
        },
      },
      createProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "notify-about-products",
        },
      },
      SNSSubscriptionSuccess: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "dmitrii_esin@epam.com",
          Protocol: "email",
          TopicArn: {
            Ref: "createProductTopic",
          },
          FilterPolicy: {
            success: ["true"],
          },
        },
      },
      SNSSubscriptionSuccessFail: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "dmitry.esin@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "createProductTopic",
          },
          FilterPolicy: {
            success: ["false"],
          },
        },
      },
    },
    Outputs: {
      SqsUrl: {
        Value: {
          Ref: "catalogItemsQueue",
        },
      },
    },
  },
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
      PGHOST: "${env:PGHOST, ''}",
      PGPORT: "${env:PGPORT, ''}",
      PGUSER: "${env:PGUSER, ''}",
      PGPASSWORD: "${env:PGPASSWORD, ''}",
      PGDATABASE: "${env:PGDATABASE, ''}",
      SNS_ARN: {
        Ref: "createProductTopic",
      },
    },
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "sqs:*",
            Resource: [
              {
                "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
              },
            ],
          },
          {
            Effect: "Allow",
            Action: "sns:*",
            Resource: {
              Ref: "createProductTopic",
            },
          },
        ],
      },
    },
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
                "application/json":
                  "${file(src/schemas/createProductSchema.json)}",
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
    catalogBatchProcess: {
      handler: "handler.connectedCatalogBatchProcess",
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
