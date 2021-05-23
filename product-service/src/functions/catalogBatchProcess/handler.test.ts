import { Context } from "aws-lambda";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";
import { InMemoryProductService } from "src/services/in-memory-product-service";
import { catalogBatchProcess } from "./handler";

const PARAMS = {
  event: {
    Records: [
      {
        messageId: "5f5e7e46-bd62-4092-8bb9-2bb6072e6e63",
        receiptHandle:
          "AQEBiO1OBXCaLhwslKftYqZzi7xN+2wZKnVaemsCT7+ksmxlmjHvuz3u8l0UbdnqyO5osr6LDpZQL/HPtahY3zs2j73Te2EeoV9ziZQ/sUhqCHjahzj0SSkBup83yCB+WAKENLfTnx0l0r0x73psy3+MeZxKD/rNX4TKBDMw0APgXrHrHuoDdSTcdQOykksE49PZSm+S5Do7oGQUs0BjA/X+EmTR2+Ncgz8TTbhZ7p6UGMYJBaE1z9DpAAcLZHvSmhPF6E4Q0JyjENlCDorKaggauImt1guXi18G5PmdAVMTuJY6Qvi8Or2cZEraQsNaycF0dfGDMfFBCG8+1NthxLMOILhfMMzXz7YcZouqNFoMGqBzVjhHNdRW9kkiRzc8Yk+Y",
        body: '{"count":"24","description":"random desc 333","date":"25.10.2020","location":"SomeTown","price":"10000","title":"random title 333","image":"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"}',
        attributes: {
          ApproximateReceiveCount: "1",
          SentTimestamp: "1621766024813",
          SenderId: "AROARP5C2HCUTCAQP5RYQ:import-service-dev-importFileParser",
          ApproximateFirstReceiveTimestamp: "1621766024816",
        },
        messageAttributes: {},
        md5OfBody: "cacafd3bd90955033f8cfe6ebede6ef1",
        eventSource: "aws:sqs",
        eventSourceARN: "arn:aws:sqs:eu-west-1:102883801257:cvs-sqs",
        awsRegion: "eu-west-1",
      },
    ],
  },
  context: {} as Context,
};

describe("lambda createProduct", () => {
  it("lambda createProduct runs corretly", async () => {
    const productService = new InMemoryProductService();
    const connectedCreateProduct = catalogBatchProcess(productService);

    const result = await connectedCreateProduct(PARAMS.event, PARAMS.context);

    expect(result.statusCode).toBe(statusCodesMap[STATUS_MESSAGES.SUCCESS]);
  });
});
