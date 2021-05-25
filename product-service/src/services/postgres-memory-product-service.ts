import { Client, QueryConfig, QueryResult } from "pg";
import { ProductServiceInterface, Product } from "src/types";
import { checkProductDtoValidity } from "@libs/productValidator";
import { CustomError } from "src/customError";
import { statusCodesMap, STATUS_MESSAGES } from "src/constants";

class PostgresProductService implements ProductServiceInterface {
  private tableName = "products";

  constructor(private databaseClient: Client) {}

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
  ): Promise<Product | null> {
    try {
      const { error } = checkProductDtoValidity(product);

      if (error) {
        throw new CustomError({
          code: statusCodesMap[STATUS_MESSAGES.BAD_REQUEST],
          message: JSON.stringify(error),
        });
      }

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

      const result: QueryResult<Product> = await this.databaseClient.query(
        query
      );

      return result.rows[0] ? result.rows[0] : null;
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  async createBatch(products: Product[]): Promise<Product[]> {
    let results: Product[] = [];

    for (const product of products) {
      try {
        const createProductResult: Product = await this.create(product);
        results.push(createProductResult);
      } catch (error) {
        const { code, message, stack } = error;
        throw new CustomError({ code, message });
      }
    }

    return results;
  }
}

export { PostgresProductService };
