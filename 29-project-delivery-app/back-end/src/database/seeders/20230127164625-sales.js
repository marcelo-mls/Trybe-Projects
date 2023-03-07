'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        total_price: 10.47,
        delivery_address: 'Yellow Brick Road',
        delivery_number: 1973,
        sale_date: '2023-01-27 19:39:49',
        status: 'Pendente',
        user_id: 3,
        seller_id: 2,
      },
      {
        id: 2,
        total_price: 37.50,
        delivery_address: 'Abbey Road',
        delivery_number: 1969,
        sale_date: '2023-01-26 15:26:01',
        status: 'Pendente',
        user_id: 3,
        seller_id: 4,
      },
    ],
  {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {});
  }
}
