const productService = require("../services/productManagementService");
const { ValidationError } = require("sequelize");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "getAllProducts failed", message: error.message });
    }
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "GetProducts failed", message: error.message });
    }
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "Create Product failed", message: error.message });
    }
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await productService.updateProduct(req.params.id, req.body);
    if (result > 0) {
      res.json({ message: "Product Updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "Update Product failed", message: error.message });
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    if (result > 0) {
      res.status(200).res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "Delete Product failed", message: error.message });
    }
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
