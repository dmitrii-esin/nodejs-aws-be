import { Client } from "pg";
import { PostgresProductService } from "src/services/postgres-memory-product-service";
import { getAllProducts } from "@functions/getAllProducts";
import { getProductById } from "@functions/getProductById";
import { createProduct } from "@functions/createProduct";
import { migrateSchema } from "@functions/migrateSchema";
import { usersSubmit as usersSubmitFn } from "@functions/usersSubmit";
import { usersInvite as usersInviteFn } from "@functions/usersInvite";

const databaseClient = new Client();
databaseClient.connect();
const productService = new PostgresProductService(databaseClient);

export const connectedGetAllProducts = getAllProducts(productService);
export const connectedGetProductById = getProductById(productService);
export const connectedCreateProduct = createProduct(productService);
export const connectedMigrateSchema = migrateSchema(databaseClient);

export const usersSubmit = usersSubmitFn;
export const usersInvite = usersInviteFn;
