const authService = require("../services/authService");
const { ValidationError } = require("sequelize");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    await authService.register(username, password, email);
    res.status(201).send("User registered successfully");
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "User registration failed", message: error.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(401).json({ error: "Validation error", messages });
    } else {
      res.status(401).json({ error: "Login failed", message: error.message });
    }
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    await authService.logout(token);
    res.status(200).send("User logged out successfully");
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "User logged out failed", message: error.message });
    }
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await authService.resetPassword(email);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(404).json({ error: "Validation error", messages });
    } else {
      res
        .status(404)
        .json({ error: "ResetPassword failed", message: error.message });
    }
  }
};

const changePassword = async (req, res) => {
  const { token, newpassword } = req.body;

  try {
    const response = await authService.changePassword(token, newpassword);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => err.message);
      res.status(400).json({ error: "Validation error", messages });
    } else {
      res
        .status(400)
        .json({ error: "ChangePassword failed", message: error.message });
    }
  }
};

module.exports = { register, login, logout, resetPassword, changePassword };
