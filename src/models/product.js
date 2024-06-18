const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Product = sequelize.define(
  "PRODUCT",
  {
    productID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    stock: {
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

module.exports = Product;
