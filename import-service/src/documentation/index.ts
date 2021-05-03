import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8000, () => {
  console.log(
    "server listening on port 8000!\nFind documentaton here: localhost:8000/api-docs"
  );
});
