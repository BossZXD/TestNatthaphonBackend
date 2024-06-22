const Cart = require("../models/cart");
const CartItem = require("../models/cartitem");
const Order = require("../models/order");
const OrderItem = require("../models/orderitem");
const Product = require("../models/product");
const sequelize = require("../../config/db");

const createCart = async (user_id) => {
  const transaction = await sequelize.transaction();
  try {
    let cart = await Cart.findOne({ where: { user_id } });
    if (!cart) {
      cart = await Cart.create({ user_id }, { transaction });
    }
    await transaction.commit();
    return cart;
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating cart:", error);
    throw error;
  }
};

const addToCart = async (cart_id, product_id, quantity) => {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  const transaction = await sequelize.transaction();
  try {
    const product = await Product.findByPk(product_id, { transaction });
    if (!product) throw new Error("Product not found");

    const cartItem = await CartItem.findOne({
      where: { cart_id, product_id },
      transaction,
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save({ transaction });
    } else {
      await CartItem.create({ cart_id, product_id, quantity }, { transaction });
    }

    await transaction.commit();
    return cartItem || { cart_id, product_id, quantity };
  } catch (error) {
    await transaction.rollback();
    console.error("Error adding to cart:", error);
    throw error;
  }
};

const updateCartItem = async (id, quantity) => {
  const transaction = await sequelize.transaction();
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      throw new Error("CartItem not found");
    }

    cartItem.quantity = quantity;
    await cartItem.save({ transaction });

    await transaction.commit();
    return cartItem;
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating cart item:", error);
    throw error;
  }
};

const removeCartItem = async (id) => {
  const transaction = await sequelize.transaction();
  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      throw new Error("CartItem not found");
    }

    await cartItem.destroy({ transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Error removing cart item:", error);
    throw error;
  }
};

const placeOrder = async (user_id) => {
  // Validate user_id
  if (user_id <= 0) {
    throw new Error("Invalid user ID");
  }

  const transaction = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({ where: { user_id } }, { transaction });
    if (!cart) throw new Error("Cart not found");

    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [Product],
      transaction,
    });

    if (cartItems.length === 0) throw new Error("No items in the cart");

    // Validate Cart item
    for (const item of cartItems) {
      if (!item) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for product ID ${item.product_id}`);
      }

      // Check stock
      if (item.product.stock <= 0) {
        throw new Error(`Product with ID ${item.product_id} is out of stock`);
      }
      if (item.product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.product_id}`);
      }
    }

    const total_amount = cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    const order = await Order.create(
      {
        user_id,
        order_date: new Date(),
        total_amount,
        status: 1,
      },
      { transaction }
    );

    for (const item of cartItems) {
      await OrderItem.create(
        {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
          status: 1,
        },
        { transaction }
      );
      item.product.stock -= item.quantity;
      await item.product.save({ transaction });

      await item.destroy({ transaction });
    }

    await transaction.commit();
    return order;
  } catch (error) {
    await transaction.rollback();
    console.error("Error placing order:", error);
    throw error;
  }
};

const getOrderHistory = async (user_id) => {
  // Validate user_id
  if (user_id <= 0) {
    throw new Error("Invalid user ID");
  }

  return await Order.findAll({
    where: { user_id },
    include: [{ model: OrderItem, include: [Product] }],
  });
};

module.exports = {
  createCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  placeOrder,
  getOrderHistory,
};
