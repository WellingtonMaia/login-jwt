'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const users = [];
      for(let x = 0; x < 10; x++) {
        users.push({
          name: faker.name.findName(),
          email: faker.internet.exampleEmail(),
          password: faker.internet.password(),
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
