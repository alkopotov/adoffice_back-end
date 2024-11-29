const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

const Category = sequelize.define('category', {
  id_category : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
})

module.exports = Category;