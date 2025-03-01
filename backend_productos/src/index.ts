import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const {sequelize} = require("./config/database");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Productos",
      version: "1.0.0",
      description: "Documentación de la API para la gestión de productos",
    },
    servers: [{ url: "http://localhost:3001/api" }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rutas de la aplicacion desde un index por legibilidad (Criterio personal)
app.use("/api", router);

app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch((error: Error) => console.error("❌ Error al conectar la BD:", error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger Docs en http://localhost:${PORT}/api-docs`);
});


export default app;