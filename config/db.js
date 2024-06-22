const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce", "root", "root", {
  host: "db",
  dialect: "mysql",
  timezone: "+07:00",
});

module.exports = sequelize;
