import { Client, QueryConfig } from "pg";
import SNS from "aws-sdk/clients/sns";
import { ProductServiceInterface, Product } from "src/types";
import { CustomError } from "src/customError";

class PostgresProductService implements ProductServiceInterface {
  private tableName = "products";

  constructor(private databaseClient: Client, private snsClient: SNS) {}

  async getProductById(id: string): Promise<Product> {
    try {
      const query = {
        text: `SELECT * FROM ${this.tableName} WHERE id = $1`,
        values: [id],
      } as QueryConfig;

      const result = await this.databaseClient.query(query);
      return result.rows[0] ? result.rows[0] : null;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const query = {
        text: `SELECT * FROM ${this.tableName}`,
      } as QueryConfig;

      const result = await this.databaseClient.query(query);
      return result.rows ? result.rows : null;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  async create(
    product: Pick<
      Product,
      | "count"
      | "description"
      | "date"
      | "location"
      | "price"
      | "title"
      | "image"
    >
  ) {
    try {
      const query = {
        text: `INSERT INTO ${this.tableName}(count, description, date, location, price, title, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        values: [
          product.count,
          product.description,
          product.date,
          product.location,
          product.price,
          product.title,
          product.image,
        ],
      };

      //TODO: type
      const result = await this.databaseClient.query(query);
      console.log("!!servive postgres result", result);

      return result.rows[0] ? result.rows[0] : null;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  //TODO: decompose and move to another
  async catalogBatchProcess(products: Product[]) {
    //TODO: type
    let results = [];

    for (const product of products) {
      try {
        //TODO: type
        // Create prodcust
        const createProductResult = await this.create(product);
        console.log("!!createProductResult", createProductResult);

        // Send success invitation
        const result = await this.snsClient
          .publish({
            Subject: "You are invited",
            Message: JSON.stringify(product),
            TopicArn: process.env.SNS_ARN,
            MessageAttributes: {
              status: {
                DataType: "String",
                StringValue: "success",
              },
            },
          })
          .promise();

        results.push(result);
      } catch (error) {
        // Send error invitation
        const result = await this.snsClient
          .publish({
            Subject: "You are invited",
            Message: JSON.stringify(product),
            TopicArn: process.env.SNS_ARN,
            MessageAttributes: {
              status: {
                DataType: "String",
                StringValue: "failure",
              },
            },
          })
          .promise();

        results.push(result);

        //TODO: ???
        // const { code, message, stack } = error;
        // throw new CustomError({ code, message });
      }
    }

    return results;
  }
}

export { PostgresProductService };
