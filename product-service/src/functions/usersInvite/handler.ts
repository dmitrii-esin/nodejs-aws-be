import "source-map-support/register";

import SNS from "aws-sdk/clients/sns";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "@libs/apiResponseBuilder";
import { winstonLogger } from "@libs/winstonLogger";
import { ResponseType } from "src/types";

export const usersInvite = (event): ResponseType => {
  try {
    winstonLogger.logRequest(`!!Incoming event: ${JSON.stringify(event)}`);

    const users: any[] = event.Records.map((record) => record.body);
    const sns = new SNS({ region: "eu-west-1" });

    // Create user account
    // Add user to the project
    // etc.

    // Send invitation
    sns.publish(
      {
        Subject: "You are invited",
        Message: JSON.stringify(users),
        TopicArn: process.env.SNS_ARN,
      },
      (err, data) => {
        console.log("!!err, data", err, data);
        console.log("!!Send email for users: ", JSON.stringify(users));
      }
    );

    winstonLogger.logRequest(`"!!Result: users ${JSON.stringify(users)}`);

    return formatSuccessResponse(users);
  } catch (error) {
    return formatErrorResponse(error);
  }
};
