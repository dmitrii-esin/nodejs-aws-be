import { ProductServiceInterface, Product } from "src/types";
import products from "@db/products.json";
import { CustomError } from "src/customError";
import { v4 as uuidv4 } from "uuid";

class InMemoryProductService implements ProductServiceInterface {
  getAllProducts() {
    try {
      return Promise.resolve(products);
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  getProductById(id: string) {
    try {
      return Promise.resolve(products.find((product) => product.id === id));
    } catch (error) {
      const { code, message, stack } = error;
      throw new CustomError({ code, message });
    }
  }

  create(
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
}

export { InMemoryProductService };
