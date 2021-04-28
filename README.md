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
