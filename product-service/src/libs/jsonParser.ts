export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}

export const parseJson = (json: JSONValue): any =>
  JSON.parse(JSON.stringify(json));

export const normalizeJsonAsArray = async (
  data: JSONValue
): Promise<Array<any>> => parseJson(data).default;
