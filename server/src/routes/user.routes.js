const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/profile", userController.profile);
userRouter.get("/search-friend", userController.searchFriend);
userRouter.post("/add-friend", userController.addFriend);
userRouter.get("/list-request/:id", userController.listRequest);

module.exports = userRouter;
