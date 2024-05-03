'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order)
      User.hasMany(models.review)
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu email",
        },
      },
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: "Por favor introduce tu password",
        },
      },
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};