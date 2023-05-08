const cartService = require('../services/cartService.js');
const { catchAsync } = require('../middlewares/error.js');

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, amount, isSubscribe } = req.body;

  if (!bookId || !amount) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const cart = await cartService.createCart(
    userId,
    bookId,
    amount,
    isSubscribe
  );

  return res.status(201).json({ message: 'PRODUCT_ADDED_TO_CART', data: cart });
});

module.exports = {
  createCart,
};
