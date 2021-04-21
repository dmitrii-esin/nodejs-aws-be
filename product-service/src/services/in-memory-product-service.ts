import { ProductServiceInterface, Product } from "src/types";
import products from "@db/products.json";
import { v4 as uuidv4 } from "uuid";

class InMemoryProductService implements ProductServiceInterface {
  getAllProducts() {
    return Promise.resolve(products);
  }

  getProductById(id: string) {
    return Promise.resolve(products.find((product) => product.id === id));
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
    products.push({
      id: uuidv4(),
      ...product,
    });
    return Promise.resolve(products[products.length - 1]);
  }
}

export { InMemoryProductService };
