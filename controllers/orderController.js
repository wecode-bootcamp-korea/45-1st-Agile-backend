const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const getUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const user = await userService.getUserById(userId);

  return res.status(200).json({ user });
});

module.exports = {
  getUserInfo,
};
