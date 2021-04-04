export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}

const parseJson = (json: JSONValue): any => JSON.parse(JSON.stringify(json));

export const normalizeJsonAsArray = (data: JSONValue): Array<any> =>
  parseJson(data)?.default || [];
