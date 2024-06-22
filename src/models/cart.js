const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const User = require("./user");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "cart",
  }
);

Cart.belongsTo(User, { foreignKey: "user_id" });

module.exports = Cart;
