const Product = require("../models/product");
const sequelize = require("../../config/db");

const getAllProducts = async () => {
  return await Product.findAll({
    where: {
      isActive: true,
    },
  });
};

const getProductById = async (id) => {
  // Validate id
  if (id <= 0) {
    throw new Error("Invalid product ID");
  }

  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const createProduct = async (productData) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await Product.create(productData, { transaction });
    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating product:", error);
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  // Validate id
  if (id <= 0) {
    throw new Error("Invalid product ID");
  }

  const transaction = await sequelize.transaction();
  try {
    const [updatedRows] = await Product.update(productData, {
      where: { id },
      transaction,
    });
    await transaction.commit();
    return updatedRows;
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  // Validate id
  if (id <= 0) {
    throw new Error("Invalid product ID");
  }

  const transaction = await sequelize.transaction();
  try {
    const [updatedRows] = await Product.update(
      { isActive: false },
      { where: { id }, transaction }
    );
    await transaction.commit();
    return updatedRows;
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting product:", error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
