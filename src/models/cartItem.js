const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const ShoppingCart = require("./shoppingCart");
const Product = require("./product");

const CartItem = sequelize.define(
  "CartItem",
  {
    cartItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cartID: {
      type: DataTypes.INTEGER,
      references: {
        model: ShoppingCart,
        key: "cartID",
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
  },
  {
    timestamps: false,
  }
);

ShoppingCart.hasMany(CartItem, { foreignKey: "cartID" });
CartItem.belongsTo(ShoppingCart, { foreignKey: "cartID" });

Product.hasMany(CartItem, { foreignKey: "productID" });
CartItem.belongsTo(Product, { foreignKey: "productID" });

module.exports = CartItem;
