const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const BlacklistedToken = sequelize.define(
  "blacklistedtoken",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "blacklistedtoken",
  }
);

module.exports = BlacklistedToken;
