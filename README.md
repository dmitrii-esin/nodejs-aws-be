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
