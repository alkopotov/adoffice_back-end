const sequelize = require('../database');
const { DataTypes } = require('sequelize')
const { Sequelize } = require('sequelize')

//** Определение модели сезонного коэффициента */
const Seasonal = sequelize.define('seasonal', {
  id_seasonal : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  month: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 12
    }
  },
  multiplier: DataTypes.DECIMAL(4,2),
});

module.exports = Seasonal;