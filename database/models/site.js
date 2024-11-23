const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

const Site = sequelize.define('site', {
  id_site : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  site_name: DataTypes.STRING,
  site_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  site_cover_daily: DataTypes.DECIMAL(11,2),
  site_cover_weekly: DataTypes.DECIMAL(11,2),
  site_cover_monthly: DataTypes.DECIMAL(11,2),
});

module.exports = Site;