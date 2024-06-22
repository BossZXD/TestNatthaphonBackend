const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { jwtSecret, jwtExpiration } = require("../../config/jwtConfig");
const BlacklistedToken = require("../models/blacklistedToken");
const { Op } = require("sequelize");
const sequelize = require("../../config/db");
const moment = require("moment-timezone");

const setResetPasswordExpires = (hours) => {
  return moment.tz(Date.now(), "Asia/Bangkok").add(hours, "hours").toDate();
};

const register = async (username, password, email) => {
  const transaction = await sequelize.transaction();

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      {
        username,
        password: hashedPassword,
        email,
      },
      { transaction }
    );

    await transaction.commit();
    return newUser;
  } catch (error) {
    await transaction.rollback();
    console.error("Error in register function:", error);
    throw error;
  }
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

const logout = async (token) => {
  const transaction = await sequelize.transaction();
  try {
    await BlacklistedToken.create({ token }, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Error blacklisting token:", error);
  }
};

const isBlacklisted = async (token) => {
  try {
    const blacklistedToken = await BlacklistedToken.findOne({
      where: { token },
    });

    return !!blacklistedToken;
  } catch (error) {
    console.error("Error checking blacklisted token:", error);
    return false;
  }
};

const resetPassword = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.reset_password_token = token;
  user.reset_password_expires = setResetPasswordExpires(1); // ตั้งค่าเวลาหมดอายุเป็น 1 ชั่วโมง
  await user.save();

  //ควรส่งกลับ Email
  return { message: "Use this token to reset your password", token };
};

const changePassword = async (token, newPassword) => {
  const user = await User.findOne({
    where: {
      reset_password_token: token,
      reset_password_expires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    throw new Error("Token is invalid or has expired");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  user.reset_password_token = null;
  user.reset_password_expires = null;
  await user.save();

  return { message: "Password changed successfully" };
};

module.exports = {
  register,
  login,
  logout,
  isBlacklisted,
  resetPassword,
  changePassword,
};
