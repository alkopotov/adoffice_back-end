const { Sequelize } = require('sequelize');
const { POSTGRE_DB_NAME, POSTGRE_ADMIN, POSTGRE_ADMIN_PASSWORD } = require('./settings');
Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;


const DIALECT = process.argv[2] || 'SQLITE';

const sequelize = DIALECT === 'SQLITE' ?
  new Sequelize({
    dialect: 'sqlite',
    storage: './adoffice.sqlite',
    define: {
      timestamps: false
    }
  }) :
  new Sequelize(POSTGRE_DB_NAME, POSTGRE_ADMIN, POSTGRE_ADMIN_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    define: {
      timestamps: false
    }
  })
  
  var types = require('pg').types

  types.setTypeParser(1700, (val) => parseFloat(val))


module.exports = sequelize;