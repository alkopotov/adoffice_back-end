const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

//** Определение модели рекламного слота */
const Adunit = sequelize.define('adunit', {
  id_adunit: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  adunit_position: DataTypes.STRING,
  adunit_is_mobile: DataTypes.BOOLEAN,
  adunit_cpm: {
    type: DataTypes.DECIMAL(8, 2),
    validate: {
      min: 0
    }
  },
  adunit_ctr: {
    type: DataTypes.DECIMAL(5, 4),
    validate: {
      min: 0,
      max: 1
    }
  },
  adunit_picture: DataTypes.TEXT,
  adunit_demo_url: DataTypes.TEXT,
  adunit_views_daily: DataTypes.INTEGER,
  adunit_cover_daily: DataTypes.DECIMAL(11, 2),
  adunit_cover_weekly: DataTypes.DECIMAL(11, 2),
  adunit_cover_monthly: DataTypes.DECIMAL(11, 2),
});

module.exports = Adunit;
