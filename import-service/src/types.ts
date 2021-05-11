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
