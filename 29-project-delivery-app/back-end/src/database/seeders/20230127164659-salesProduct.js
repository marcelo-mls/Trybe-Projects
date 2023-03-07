'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 11,
        quantity: 3,
      },
      {
        sale_id: 2,
        product_id: 2,
        quantity: 5,
      },
    ],
  {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
}
