const express = require("express");
const CartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
router.use(authenticate);

router.post("/create/cart/:user_id", CartController.createCart);
router.post("/cart/add", CartController.addToCart);
router.put("/cart/update_item/:id", CartController.updateCartItem);
router.delete("/cart/remove_item/:id", CartController.removeCartItem);
router.post("/cart/order/:user_id", CartController.placeOrder);
router.get("/ordersHistory/:id", CartController.getOrderHistory);

module.exports = router;
