'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'author_id'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    checked_email: DataTypes.BOOLEAN,
    permission: DataTypes.ENUM('admin', 'editor', 'subscriber'),
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
};