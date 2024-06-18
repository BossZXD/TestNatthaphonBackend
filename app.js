const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const sequelize = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", authRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

module.exports = app;
