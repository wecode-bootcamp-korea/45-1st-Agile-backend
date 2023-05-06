const orderService = require('../services/orderService');
// const bookService = require('../services/bookService');
// const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const completeOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { address, quantity, bookId } = req.body;

  await orderService.completeOrder(address, userId, bookId, quantity);

  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

module.exports = {
  completeOrder,
};
