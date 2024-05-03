'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: models.product_category
      })
      Product.belongsToMany(models.Order, {
        through: models.order_product
      })
      Product.hasMany(models.review)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduzca un nombre"
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduzca un precio"
        }
      }
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Product',
    getterMethods: {
      image_url() {
        return `/product_images${this.image_path}`;
      }
    }
  });
  return Product;
};