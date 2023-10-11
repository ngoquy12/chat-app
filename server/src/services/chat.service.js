const connection = require("../config/dbConfig");

module.exports.createRoom = async (ChatName, UserId) => {
  const [[chatRoom]] = await connection.execute(
    "SELECT * FROM chats WHERE ChatName = ?",
    [ChatName]
  );
  if (!chatRoom) {
    return await connection.execute(
      "INSERT INTO chats(ChatName, UserId) VALUES (?, ?)",
      [ChatName, UserId]
    );
  } else {
    return {
      status: 400,
      message: "Tên phòng đã tồn tại.",
    };
  }
};

module.exports.findOne = async (id) => {
  const [listRoom] = await connection.execute(
    "SELECT * FROM chats WHERE UserId = ?",
    [id]
  );
  return listRoom;
};

module.exports.getMessage = async (id) => {
  const [messages] = await connection.execute(
    "SELECT * FROM messages WHERE ChatId = ?",
    [+id]
  );
  return messages;
};

module.exports.addMessage = async (ChatId, UserId, Content) => {
  await connection.execute(
    "INSERT INTO messages(ChatId, UserId, Content) VALUES (?,?,?)",
    [ChatId, UserId, Content]
  );
};
