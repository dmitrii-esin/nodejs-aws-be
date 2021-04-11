import * as data from "@db/products.json";
import { normalizeJsonAsArray } from "@libs/jsonParser";
import { CustomError } from "src/customError";
import { Product } from "src/types";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products: Product[] = await normalizeJsonAsArray(data);

    return products;
  } catch (error) {
    const { code, message, stack } = error;
    throw new CustomError({ code, message });
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const products: Product[] = await normalizeJsonAsArray(data);

    const currentProduct: Product = products.find(
      (ticket: Product) => ticket.id === id
    );

    return currentProduct;
  } catch (error) {
    const { code, message, stack } = error;
    throw new CustomError({ code, message });
  }
};
