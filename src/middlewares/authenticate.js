const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/jwtConfig");
const { isBlacklisted } = require("../services/authService");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    const tokenIsBlacklisted = await isBlacklisted(token);
    if (tokenIsBlacklisted) {
      return res.status(401).send("Access denied. Token has been revoked.");
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authenticate;
