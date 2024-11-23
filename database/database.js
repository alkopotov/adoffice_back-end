const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './adoffice.sqlite',
  define: {
    timestamps: false
  }
});

module.exports = sequelize;