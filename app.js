require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const sequelize = require("./config/db");

const app = express();
const PORT = 7077;

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

module.exports = app;
