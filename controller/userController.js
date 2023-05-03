const userService = require('../service/userService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error('KEY_ERROR');
      err.statusCode = 400;
      throw err;
    }

    const accessToken = await userService.login(email, password);
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  login,
};
