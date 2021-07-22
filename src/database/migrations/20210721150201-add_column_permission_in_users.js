'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('Users', 'permission',
     { 
         type: Sequelize.ENUM('admin', 'editor', 'subscriber'),
         allowNull: false,   
     });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('Users', 'permission');
  }
};
