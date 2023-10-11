const userService = require("../services/user.service");

module.exports.register = async (req, res) => {
  try {
    await userService.register(req.body);
    return res.status(200).json({
      status: 201,
      message: "Đăng ký tài khoản thành công.",
    });
  } catch (error) {
    return res.json(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    req.session.user = result.token;
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
