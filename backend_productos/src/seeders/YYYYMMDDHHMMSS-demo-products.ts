import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("products", [
      {
        name: "Laptop Gamer",
        description: "Laptop con tarjeta gráfica RTX 3060",
        price: 4500000,
      },
      {
        name: "Monitor 4K",
        description: "Monitor de alta resolución 27 pulgadas",
        price: 1200000,
      },
      {
        name: "Teclado Mecánico",
        description: "Teclado con switches rojos y RGB",
        price: 350000,
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("products", {});
  },
};
