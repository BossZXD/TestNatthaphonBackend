const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define(
  "ORDER_ITEM",
  {
    orderItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderID: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "orderID",
      },
    },
    productID: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productID",
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
  },
  {
    timestamps: false,
  }
);

Order.hasMany(OrderItem, { foreignKey: "orderID" });
OrderItem.belongsTo(Order, { foreignKey: "orderID" });

Product.hasMany(OrderItem, { foreignKey: "productID" });
OrderItem.belongsTo(Product, { foreignKey: "productID" });

module.exports = OrderItem;
