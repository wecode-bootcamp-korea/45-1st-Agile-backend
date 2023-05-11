const orderService = require('../services/orderService');
const { catchAsync } = require('../middlewares/error');

const completeOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const { address, subscribeDeliveryTime, bookId, quantity } = req.body;

  const order = await orderService.completeOrder(
    address,
    user,
    subscribeDeliveryTime,
    bookId,
    quantity
  );

  return res.status(201).json({ message: 'CREATE SUCCESS', data: order });
});

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

const getSubscribeBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await orderService.getSubscribeBooks(userId);

  return res
    .status(200)
    .json({ message: 'SUBSCRIBE BOOKS GET SUCCESS', result });
});

module.exports = {
  completeOrder,
  completeOrders,
  getOrderStatus,
  getSubscribeBooks,
};
