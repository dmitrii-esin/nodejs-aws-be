import { Client } from "pg";
import { PostgresProductService } from "src/services/postgres-memory-product-service";
import { getAllProducts } from "@functions/getAllProducts";
import { getProductById } from "@functions/getProductById";
import { createProductHandler } from "@functions/createProduct";
import { migrateSchema } from "@functions/migrateSchema";

console.log("!!process.env", process.env);

const databaseClient = new Client();
databaseClient.connect();
const productService = new PostgresProductService(databaseClient);

export const connectedGetAllProducts = getAllProducts(productService);
export const connectedGetProductById = getProductById(productService);
export const connectedCreateProduct = createProductHandler(productService);
export const connectedMigrateSchema = migrateSchema(databaseClient);
