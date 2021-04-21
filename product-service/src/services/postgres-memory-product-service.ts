import { ProductServiceInterface, Product } from "src/types";
import { Client, QueryConfig } from "pg";

class PostgresProductService implements ProductServiceInterface {
  private tableName = "products";

  constructor(private databaseClient: Client) {}

  async getProductById(id: string): Promise<Product> {
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE id = $1`,
      values: [id],
    } as QueryConfig;

    const result = await this.databaseClient.query(query);
    return result.rows[0] ? result.rows[0] : null;
  }

  async getAllProducts(): Promise<Product[]> {
    const query = {
      text: `SELECT * FROM ${this.tableName}`,
    } as QueryConfig;

    const result = await this.databaseClient.query(query);
    return result.rows ? result.rows : null;
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
    const result = await this.databaseClient.query(query);
    return result.rows[0] ? result.rows[0] : null;
  }
}

export { PostgresProductService };
