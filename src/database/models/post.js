'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'author_id'
      });
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
    paranoid: true,
  });
  return Post;
};