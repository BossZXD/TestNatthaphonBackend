const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
