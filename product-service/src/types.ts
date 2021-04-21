import { statusCodesMap } from "src/constants";

export type ResponseType = {
  statusCode: Values<typeof statusCodesMap>;
  headers: Object;
  body: Object;
};

export interface Product {
  id: string;
  count: number;
  description: string;
  date: string;
  location: string;
  price: number;
  title: string;
  image: string;
}

export interface ProductServiceInterface {
  getAllProducts: () => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product>;
  create: (
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
  ) => Promise<Product>;
}
