const paymentService = require('../services/bookService');
const { catchAsync } = require('../middlewares/error');

const getUserInfo = catchAsync(async (req, res) => {
  const userId = req.users.id;

  if (!userId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const user = await paymentService.getUserInfo(bookId);

  return res.status(200).json({ user });
});

module.exports = {
  getUserInfo,
};
