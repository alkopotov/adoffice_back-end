const sequelize = require('../database');
const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

const Discount = sequelize.define('discount', {
  id_discount : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  discount_level: DataTypes.DECIMAL(11, 2),
  discount_value: DataTypes.DECIMAL(3, 2),
});

module.exports = Discount;