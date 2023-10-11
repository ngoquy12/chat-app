const express = require("express");
const authRouter = express.Router();
const userController = require("../controllers/auth.controller");
const {
  validateData,
  checkEmail,
  validateDataLogin,
} = require("../middlewares/auth.middleware");

authRouter.post("/register", validateData, checkEmail, userController.register);

authRouter.post("/login", validateDataLogin, userController.login);

module.exports = authRouter;
