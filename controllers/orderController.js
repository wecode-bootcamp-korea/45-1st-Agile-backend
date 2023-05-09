const orderService = require('../services/orderService');
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
  const user = req.user;
  const { address, SubscribeDeliveryTime, cartIds } = req.body;

  const order = await orderService.completeOrders(
    address,
    user,
    SubscribeDeliveryTime,
    cartIds
  );

  return res.status(201).json({ message: 'CREATE SUCCESS', data: order });
});

module.exports = {
  getUserInfo,
  completeOrders,
};
