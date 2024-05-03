'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'products', [
      {
      name: 'Choclo',
      price: '20',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Mechacorta',
      price: '50',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'SillaVater',
      price: '120',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'ChalecoAntiGatos',
      price: '40',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'AbrePuertas',
      price: '90',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
