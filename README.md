# Serverless framework example app
This project was bootstrapped with [Serverless framework](https://www.serverless.com)

## Requirements
-   NodeJS 14+
-   AWS CLI
-   AWS account
-   AWS CLI must be configured with personal credentials

## Setup
```bash
cd ./product-service && npm install
```

## Run offline 
```bash
cd ./product-service && npm run start:offline
```

## Deployment 
```bash
cd ./product-service && npm run deploy:dev
```

## Swagger
```bash
cd ./product-service && npm run documentation:generate && npm run documentation:open
```

## Changelog
### task3-product-api
- Product service is done, FE is working and integrated with product services, some additional tasks is done
- Implemented additional tasks: 
    - async\await is used
    - ES6 modules are used
    - webpack is configured automatically by typescript template
    - lambda handlers are covered by unit tests
    - lambda handlers code is written not in 1 single module (file) and separated in codebase
    - main error scenarios are handled by API ("Product not found" error, try catch blocks are used in lambda handlers)
    - SWAGGER documentation is created for product-service
- Links to product-service API:
    GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products
    GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products/{id}
- Link to FE pull-request:
    https://github.com/dmitrii-esin/nodejs-aws-fe/pull/2
- Link to FE app :
    https://d12t0bvcb8pyyn.cloudfront.net

 
 ### task4-rds
 All tasks implemented without additional stocks table:
Main:
- [x] 1 - Task 4.1 is implemented
- [x] 3 - TASK 4.2 is implemented lambda links are provided and returns data
- [x] 4 - TASK 4.3 is implemented lambda links are provided and products is stored in DB (call TASK 4.2 to see the product)
- [x] 5 - Your own Frontend application is integrated with product service (/products API) and products from product-service are represented on Frontend. Link to a working Front-End application is provided for cross-check reviewer.

Additional:
- [x] +1 - POST/products lambda functions returns error 400 status code if product data is invalid
- [x] +1 - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
- [x] +1 - All lambdas do console.log for each incoming requests and their arguments
- [ ] +1 - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa) (https://devcenter.kinvey.com/nodejs/tutorials/bl-transactional-support)

endpoints:
- GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products
- GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products/{id}
- POST - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products
- GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/migrate

frontend app link: https://d12t0bvcb8pyyn.cloudfront.net

 ### task5-import-to-s3
 Main:
- [x] 1 - Task 5.1 is implemented (importe-service created, importProductsFile implemented)
- [x] 2 - TASK 5.2 is implemented (importFileParser implemented)

Additional:
- [x] +1 - async/await is used in lambda functions
- [x] +1 - importProductsFile lambda is covered by unit tests (aws-sdk-mock can be used to mock S3 methods - https://www.npmjs.com/package/aws-sdk-mock)
- [x] +1 - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into parsed folder, and then deleted from uploaded folder)

endpoints:
- GET - https://nr3xtj1l4g.execute-api.eu-west-1.amazonaws.com/dev/import

functions:
- importProductsFile: import-service-dev-importProductsFile
- importFileParser: import-service-dev-importFileParser

frontend app link: https://d12t0bvcb8pyyn.cloudfront.net
frontend repository PR link: https://github.com/dmitrii-esin/nodejs-aws-fe/pull/3

 ### task6-sqs-sns
 Main:
 - [x] TASK 6.1 Create a lambda function called catalogBatchProcess in the resources section in serverless.yml.
 - [x] TASK 6.2 Create a SQS queue, called catalogItemsQueue, configure the SQS to trigger lambda catalogBatchProcess and update the importFileParser lambda
- [x] TASK 6.3 Create an SNS topic createProductTopic and email subscription
Additional:
- [x] +1 - catalogBatchProcess lambda is covered by unit tests
- [x]  +1 - set a Filter Policy for SNS createProductTopic in serverless.yml (Create an additional email subscription and distribute messages to different emails depending on the filter for any product attribute)

Additional:
- [x] +1 - async/await is used in lambda functions
- [x] +1 - importProductsFile lambda is covered by unit tests (aws-sdk-mock can be used to mock S3 methods - https://www.npmjs.com/package/aws-sdk-mock)
- [x] +1 - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into parsed folder, and then deleted from uploaded folder)

Frontend app link:
https://d12t0bvcb8pyyn.cloudfront.net/admin/products

import-service:
endpoints:
GET - https://nr3xtj1l4g.execute-api.eu-west-1.amazonaws.com/dev/import
functions:
importProductsFile: import-service-dev-importProductsFile
importFileParser: import-service-dev-importFileParser

product-service:
endpoints:
GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products
GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products/{id}
POST - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/products
GET - https://ie2svy46v9.execute-api.eu-west-1.amazonaws.com/dev/migrate
functions:
getAllProducts: product-service-dev-getAllProducts
getProductById: product-service-dev-getProductById
createProductHandler: product-service-dev-createProductHandler
migrateSchema: product-service-dev-migrateSchema
catalogBatchProcess: product-service-dev-catalogBatchProcess
