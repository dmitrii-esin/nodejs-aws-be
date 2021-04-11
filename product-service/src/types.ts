import { statusCodesMap } from "src/constants";

export type ResponseType = {
  statusCode: Values<typeof statusCodesMap>;
  headers: Object;
  body: Object;
};

export interface Product {
  count: number;
  description: string;
  date: Date;
  location: string;
  id: string;
  price: number;
  title: string;
  image: string;
}
