const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
//const { jwtSecret, jwtExpiration } = require("../../config/jwtConfig");

const register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword });
};

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const logout = async () => {
  // Handle logout logic here if needed (e.g., invalidating tokens)
};

module.exports = { register, login, logout };
