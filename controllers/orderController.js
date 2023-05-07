const orderService = require('../services/orderService');
// const bookService = require('../services/bookService');
// const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const completeOrders = catchAsync(async (req, res) => {
  const userId = req.user.id;
  // const { address, quantity, bookId } = req.body;
  const { address, bookIdAndQuantity } = req.body;

  // await orderService.completeOrder(address, userId, bookId, quantity);
  await orderService.completeOrders(address, userId, bookIdAndQuantity);

  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

module.exports = {
  completeOrders,
};
