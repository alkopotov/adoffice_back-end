const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

const Image = sequelize.define('image', {
  id_image : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true
    }
  },
  image_description: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
});

module.exports = Image;