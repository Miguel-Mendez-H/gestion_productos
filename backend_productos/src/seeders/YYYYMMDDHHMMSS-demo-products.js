"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("products", [
      {
        name: "Producto 1",
        description: "Descripción del producto 1",
        price: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Producto 2",
        description: "Descripción del producto 2",
        price: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  }
};
