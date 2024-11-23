const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

const Category = sequelize.define('category', {
  id_category : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_name: DataTypes.STRING,
})

module.exports = Category;