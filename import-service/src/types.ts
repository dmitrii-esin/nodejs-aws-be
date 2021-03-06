import { statusCodesMap } from "src/constants";

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}

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
