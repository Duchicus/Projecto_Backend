'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category,{
        through:models.product_category
      })
      Product.belongsToMany(models.Order,{
        through:models.order_product
      })
      Product.hasMany(models.review)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};