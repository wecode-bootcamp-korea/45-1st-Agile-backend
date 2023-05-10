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

module.exports = {
  completeOrders,
};
