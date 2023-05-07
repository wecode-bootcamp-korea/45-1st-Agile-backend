const orderService = require('../services/orderService');
// const bookService = require('../services/bookService');
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

const completeOrders = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { address, bookIdAndQuantity } = req.body;

  const order = await orderService.completeOrders(
    address,
    userId,
    bookIdAndQuantity
  );

  return res.status(201).json({ message: 'CREATE SUCCESS', data: order });
});

module.exports = {
  getUserInfo,
  completeOrders,
};
