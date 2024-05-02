'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    static associate(models) {
      review.belongsTo(models.User)
      review.belongsTo(models.Product)
    }
  }
  review.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};