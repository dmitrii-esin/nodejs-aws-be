import "source-map-support/register";

import { middyfy } from "@libs/lambda";

const hello = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(""),
  };
};

export const main = middyfy(hello);
