const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const ShoppingCart = sequelize.define(
  "SHOPPING_CART",
  {
    cartID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ShoppingCart;
