const express = require("express");
const productController = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
router.use(authenticate);

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.post("/create/products", productController.createProduct);
router.put("/update/products/:id", productController.updateProduct);
router.put("/delete/products/:id", productController.deleteProduct);

module.exports = router;
