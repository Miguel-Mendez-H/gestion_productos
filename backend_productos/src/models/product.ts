import { Model, DataTypes } from "sequelize";
const sequelize = require("../config/database"); // Verificar que se importa correctamente

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false,
  }
);

export default Product;
