const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

const User = sequelize.define('user', {
  id_user : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  user_email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  is_super:  {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  user_token: DataTypes.STRING,
  user_agent: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
})

module.exports = User;