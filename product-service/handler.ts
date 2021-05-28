import { Client } from "pg";
import SNS from "aws-sdk/clients/sns";
import { PostgresProductService } from "src/services/postgres-memory-product-service";
import { NotificationService } from "src/services/notification-service";
import { getAllProducts } from "@functions/getAllProducts";
import { getProductById } from "@functions/getProductById";
import { createProduct } from "@functions/createProduct";
import { migrateSchema } from "@functions/migrateSchema";
import { catalogBatchProcess } from "@functions/catalogBatchProcess";

const databaseClient = new Client();
const snsClient = new SNS({ region: process.env.REGION });
databaseClient.connect();
const productService = new PostgresProductService(databaseClient);
const notificationService = new NotificationService(snsClient);

export const connectedGetAllProducts = getAllProducts(productService);
export const connectedGetProductById = getProductById(productService);
export const connectedCreateProduct = createProduct(productService);
export const connectedMigrateSchema = migrateSchema(databaseClient);
export const connectedCatalogBatchProcess = catalogBatchProcess(
  productService,
  notificationService
);
