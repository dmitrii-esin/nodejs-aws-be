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

      //TODO: !!! createProducts -> отправить email об удачном сохранении продукта

      return result.rows[0] ? result.rows[0] : null;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  async catalogBatchProcess(products: string[]) {
    try {
      //TODO: type
      let results = [];

      console.log(
        "!!catalogBatchProcess process.env.SNS_ARN",
        process.env.SNS_ARN
      );

      for (const product in products) {
        //TODO: type
        // Create prodcust
        // const result = await this.create(product);
        // results.push(result);
        // Send invitation
        this.snsClient.publish(
          {
            Subject: "You are invited",
            Message: JSON.stringify(product),
            TopicArn: process.env.SNS_ARN,
          },
          (err, data) => {
            console.log("!!err, data", err, data);
            console.log("!!Send email for users: ", JSON.stringify(product));
          }
        );
      }

      return results;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }
}

export { PostgresProductService };
