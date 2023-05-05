const orderService = require('../services/orderService');
const bookService = require('../services/bookService');
const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { address, quantity, bookId } = req.body;

  await orderService.createOrder(address, userId, bookId, quantity);

  const book = await bookService.getBookById(bookId);

  const points = book.price;

  await userService.updateUserPoints(userId, points);

  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

module.exports = {
  createOrder,
};
