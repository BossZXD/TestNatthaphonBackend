const express = require("express");
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticate, authController.logout);
router.post("/reset-password", authController.resetPassword);
router.post("/change-password", authController.changePassword);

module.exports = router;
