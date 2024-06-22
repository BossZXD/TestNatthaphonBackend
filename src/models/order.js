const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const User = require("./user");

const Order = sequelize.define(
  "order",
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
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, //0 ปกติ 1 เสร็จสิ้น 2 ยกเลิก
    },
  },
  {
    timestamps: true,
    tableName: "order",
  }
);

Order.belongsTo(User, { foreignKey: "user_id" });

module.exports = Order;
