const chatService = require("../services/chat.service");

module.exports.createRoom = async (req, res) => {
  const { ChatName, UserId } = req.body;
  const result = await chatService.createRoom(ChatName, UserId);
  return res.json(result);
};

module.exports.findOne = async (req, res) => {
  const { id } = req.params;
  const result = await chatService.findOne(id);
  return res.json(result);
};

module.exports.getMessage = async (req, res) => {
  const { id } = req.params;
  const result = await chatService.getMessage(id);
  return res.json(result);
};

module.exports.addMessage = async (req, res) => {
  const { ChatId, UserId, Content } = req.body;
  const result = await chatService.addMessage(ChatId, UserId, Content);
  return res.json(result);
};
