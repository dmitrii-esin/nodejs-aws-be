import "source-map-support/register";

import SQS from "aws-sdk/clients/sqs";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType } from "src/types";

export const usersSubmit = (event, _context, callback): ResponseType => {
  try {
    winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

    const sqs = new SQS();
    const users: any[] = JSON.parse(event.body);

    users.forEach((user) => {
      sqs.sendMessage(
        {
          QueueUrl: process.env.SQS_URL,
          MessageBody: user,
        },
        (err, data) => {
          console.log("!!err, data", err, data);
          console.log("!!Send message for user: ", user);
        }
      );
    });

    // callback(null, {
    //   statusCode: 200,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });

    winstonLogger.logRequest(`"!!Result: users ${JSON.stringify(users)}`);

    return formatSuccessResponse(users);
  } catch (error) {
    return formatErrorResponse(error);
  }
};
