const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    await authService.register(username, password);
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    await authService.logout();
    res.status(200).send("User logged out successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { register, login, logout };
