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
    Resources: {
      CognitoUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          MfaConfiguration: "OFF",
          UserPoolName: "metal-tickets-pool",
          UsernameAttributes: ["email"],
          Policies: {
            PasswordPolicy: {
              MinimumLength: 6,
              RequireLowercase: "False",
              RequireNumbers: "True",
              RequireSymbols: "False",
              RequireUppercase: "True",
            },
          },
        },
      },
      CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: "metal-tickets-client",
          GenerateSecret: "False",
          UserPoolId: {
            Ref: "CognitoUserPool",
          },
        },
      },
    },
    Outputs: {
      basicAuthorizer: {
        Value: {
          "Fn::GetAtt": "BasicAuthorizerLambdaFunction.Arn",
        },
        Export: {
          Name: "basicAuthorizer",
        },
      },
      CognitoUserPoolArn: {
        Value: {
          "Fn::GetAtt": "CognitoUserPool.Arn",
        },
        Export: {
          Name: "CognitoUserPoolArn",
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
