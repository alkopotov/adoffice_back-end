const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

//** Определение модели рекламного формата */
const Adformat = sequelize.define('adformat', {
  id_adformat : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  adformat_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
})

module.exports = Adformat;