'use strict';

const faker = require('faker');
const { hash } = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const users = [];
      const permissions = ['admin', 'editor', 'subscriber'];
      for(let x = 0; x < 10; x++) {
        users.push({
          name: faker.name.findName(),
          email: faker.internet.exampleEmail(),
          password: await hash('123456', 12),
          permission: faker.random.arrayElement(permissions),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
  }
};
