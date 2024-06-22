const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Cart = require("./cart");
const Product = require("./product");

const CartItem = sequelize.define(
  "cart_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cart,
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
  },
  {
    timestamps: true,
    tableName: "cart_item",
  }
);

CartItem.belongsTo(Cart, { foreignKey: "cart_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

module.exports = CartItem;
