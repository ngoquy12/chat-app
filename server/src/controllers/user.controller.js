const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

module.exports.profile = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const user = jwt.verify(token, process.env.TOKEN_SECRET, { complete: true });
  console.log(user.payload.data);
};

module.exports.searchFriend = async (req, res) => {
  const { search } = req.query;
  const [user] = await userService.searchFriend(search);
  return res.status(200).json(user);
};

module.exports.addFriend = async (req, res) => {
  const { UserId, FriendId, Status } = req.body;
  const result = await userService.addFriend(
    Number(UserId),
    Number(FriendId),
    Number(Status)
  );
  return res.status(200).json(result);
};

module.exports.listRequest = async (req, res) => {
  const { id } = req.params;
  const result = await userService.listRequest(Number(id));
  return res.status(200).json(result);
};
