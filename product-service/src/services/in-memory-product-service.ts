import { ProductServiceInterface, Product } from "src/types";
import products from "./products.json";
import { CustomError } from "src/customError";
import { v4 as uuidv4 } from "uuid";

class InMemoryProductService implements ProductServiceInterface {
  getAllProducts(): Promise<Product[]> {
    try {
      return Promise.resolve(products);
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  getProductById(id: string): Promise<Product> {
    try {
      return Promise.resolve(products.find((product) => product.id === id));
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
  ): Promise<Product> {
    try {
      products.push({
        id: uuidv4(),
        ...product,
      });
      return Promise.resolve(products[products.length - 1]);
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

export { InMemoryProductService };
