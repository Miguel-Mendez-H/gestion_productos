import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    "postgres",
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
      logging: false,
    }
  );
  

const createDatabase = async () => {
  try {
    await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME};`);
    console.log(`Base de datos "${process.env.DB_NAME}" creada correctamente.`);
  } catch (error: any) {
    if (error.message.includes("already exists")) {
      console.log(`La base de datos "${process.env.DB_NAME}" ya existe.`);
    } else {
      console.error("Error al crear la base de datos:", error);
    }
  } finally {
    await sequelize.close();
  }
};

createDatabase();
