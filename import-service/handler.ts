// import { PostgresProductService } from "src/services/postgres-memory-product-service";
// import { createProduct } from "@functions/createProduct";
import { importProductsFile as importProductsFileFn } from "@functions/importProductsFile";
import { importFileParser as importFileParserFn } from "@functions/importFileParser";

export const importProductsFile = importProductsFileFn;
export const importFileParser = importFileParserFn;

// const productService = new PostgresProductService(databaseClient);

// export const connectedCreateProduct = createProduct(productService);
