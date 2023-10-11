const { findUserByEmail } = require("../services/user.service");

module.exports.validateData = async (req, res, next) => {
  const { UserName, Email, Password } = req.body;

  if (!UserName) {
    return res.status(400).json({
      status: 400,
      message: "Tên không được để trống.",
    });
  }

  if (!Email) {
    return res.status(400).json({
      status: 400,
      message: "Email không được để trống.",
    });
  }

  if (!Password) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu không được để trống.",
    });
  }

  next();
};

module.exports.validateDataLogin = async (req, res, next) => {
  const { Email, Password } = req.body;

  if (!Email) {
    return res.status(400).json({
      status: 400,
      message: "Email không được để trống.",
    });
  }

  if (!Password) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu không được để trống.",
    });
  }

  next();
};

module.exports.checkEmail = async (req, res, next) => {
  const { Email } = req.body;
  const [user] = await findUserByEmail(Email);

  if (user[0]) {
    return res.status(400).json({
      status: 400,
      message: "Email đã tồn tại.",
    });
  } else {
    next();
  }
};
