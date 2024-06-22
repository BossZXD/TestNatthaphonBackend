const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
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
    tableName: "order_item",
  }
);

OrderItem.belongsTo(Order, { foreignKey: "id" });
Order.hasMany(OrderItem, { foreignKey: "order_id" });

OrderItem.belongsTo(Product, { foreignKey: "id" });
Product.hasMany(OrderItem, { foreignKey: "product_id" });
module.exports = OrderItem;
