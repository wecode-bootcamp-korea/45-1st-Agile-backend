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

module.exports = {
  completeOrder,
  completeOrders,
};
