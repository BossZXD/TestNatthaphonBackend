const cartService = require("../services/cartService");
const { ValidationError } = require("sequelize");

const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart(req.params.user_id);
    res.status(201).json(cart);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "CreateCart failed", message: error.message });
    }
  }
};

const addToCart = async (req, res) => {
  try {
    const { cart_id, product_id, quantity } = req.body;
    const cartItem = await cartService.addToCart(cart_id, product_id, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "addToCart failed", message: error.message });
    }
  }
};

const updateCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const quantity = req.body.quantity;
    const updatedCartItem = await cartService.updateCartItem(id, quantity);
    res.status(200).json(updatedCartItem);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "updateCartItem failed", message: error.message });
    }
  }
};

const removeCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    await cartService.removeCartItem(id);
    res.status(200).json({ message: "CartItem removed successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "removeCartItem failed", message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const order = await cartService.placeOrder(req.params.user_id);
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "placeOrder failed", message: error.message });
    }
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const orders = await cartService.getOrderHistory(req.params.id);
    res.status(201).json(orders);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "getOrderHistory failed", message: error.message });
    }
  }
};

module.exports = {
  createCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  placeOrder,
  getOrderHistory,
};
