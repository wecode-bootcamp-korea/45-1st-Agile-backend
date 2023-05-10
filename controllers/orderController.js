const orderService = require('../services/orderService');
const { catchAsync } = require('../middlewares/error');

const completeOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const { address, subscribeDeliveryTime, cartIds } = req.body;

  const order = await orderService.completeOrders(
    address,
    user,
    subscribeDeliveryTime,
    cartIds
  );

  return res.status(201).json({ message: 'CREATE SUCCESS', data: order });
});

const getOrderStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await orderService.getOrderStatus(userId);
  const resultCount = await orderService.getOrderStatusCount(userId);
  return res.status(200).json({
    message: 'ORDER GET SUCCESS',
    data: result,
    orderStatus: resultCount,
  });
});

module.exports = {
  completeOrders,
  getOrderStatus,
};
