const express = require("express");
const chatController = require("../controllers/chat.controller");

const chatRouter = express.Router();
chatRouter.post("/", chatController.createRoom);
chatRouter.get("/:id", chatController.findOne);
chatRouter.get("/message/:id", chatController.getMessage);
chatRouter.post("/add-message", chatController.addMessage);

module.exports = chatRouter;
