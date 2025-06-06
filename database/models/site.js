const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

//** Определение модели сайта */
const Site = sequelize.define('site', {
  id_site: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  site_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  site_description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  site_domain: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true,
    },
    unique: true
  },
  site_vat: {type: DataTypes.DECIMAL(4, 3),
    defaultValue: 0.2
  },
  site_cover_daily: DataTypes.DECIMAL(11, 2),
  site_cover_weekly: DataTypes.DECIMAL(11, 2),
  site_cover_monthly: DataTypes.DECIMAL(11, 2),
});

module.exports = Site;