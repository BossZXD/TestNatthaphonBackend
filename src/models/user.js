const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define(
  "USER",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
