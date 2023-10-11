const bcrypt = require("bcrypt");
const connection = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.register = async (user) => {
  console.log("user", user);
  try {
    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(user.Password, salt);

    return await connection.execute(
      "INSERT INTO users(UserName, Gender, DateOfBirth, Address, Email, Password, CreatedDate) VALUES (?,?,?,?,?,?,?)",
      [
        user.UserName,
        user.Gender,
        user.DateOfBirth,
        user.Address,
        user.Email,
        hashPassword,
        user.CreatedDate,
      ]
    );
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

module.exports.findUserByEmail = async (email) => {
  return await connection.execute("SELECT * FROM users WHERE Email = ?", [
    email,
  ]);
};

module.exports.login = async (user) => {
  try {
    const [[findUser]] = await this.findUserByEmail(user.Email);

    if (!findUser) {
      return {
        status: 400,
        message: "Email nhập vào không đúng.",
      };
    } else {
      const comparePassword = bcrypt.compareSync(
        user.Password,
        findUser.Password
      );

      if (!comparePassword) {
        return {
          status: 400,
          message: "Mật khẩu không đúng.",
        };
      } else {
        let access_token = jwt.sign(
          {
            data: {
              userId: findUser.UserId,
              userName: findUser.UserName,
              email: findUser.Email,
            },
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "60s" }
        );

        return {
          status: 200,
          message: "Đăng nhập thành công.",
          data: findUser,
          token: access_token,
        };
      }
    }
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};

module.exports.searchFriend = async (search) => {
  return await connection.execute(
    `SELECT * FROM users WHERE UserName like '%${search}%'`
  );
};

module.exports.addFriend = async (UserId, FriendId, Status) => {
  const [[checkFriendExit]] = await connection.execute(
    "SELECT * FROM friends WHERE UserId = ? AND FriendId = ?",
    [UserId, FriendId]
  );

  if (!checkFriendExit) {
    return await connection.execute(
      `INSERT INTO friends(UserId, FriendId, Status) VALUES (?,?,?)`,
      [UserId, FriendId, Status]
    );
  } else {
    return;
  }
};

module.exports.listRequest = async (id) => {
  const [friends] = await connection.execute(
    `SELECT * FROM friends f join users u on u.UserId = f.UserId WHERE u.UserId = ?`,
    [id]
  );
  return friends;
};
