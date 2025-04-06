const { Sequelize } = require('sequelize');
const { POSTGRE_DB_NAME, POSTGRE_ADMIN, POSTGRE_ADMIN_PASSWORD, HOME_ADM_PASS } = require('./settings');
Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

const DIALECT = process.argv[2] || 'SQLITE';

//** Определение параметров базы данных */
const sequelize = DIALECT === 'SQLITE' ?
  new Sequelize({
    dialect: 'sqlite',
    storage: './adoffice.sqlite',
    define: {
      timestamps: false
    }
  }) :
  new Sequelize(POSTGRE_DB_NAME, POSTGRE_ADMIN, HOME_ADM_PASS, {
    dialect: 'postgres',
    host: 'localhost',
    define: {
      timestamps: false
    }
  })
  
module.exports = sequelize;