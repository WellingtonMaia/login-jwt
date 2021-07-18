'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const posts = [];
    for(let x = 0; x < 10; x++) {
      posts.push({
        title: faker.name.title(),
        content: faker.lorem.sentences(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {}); 
  }
};
