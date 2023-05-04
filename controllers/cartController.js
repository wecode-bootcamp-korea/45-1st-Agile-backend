const cartService = require('../services/cartService.js');
const { catchAsync } = require('../middlewares/error.js');

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;
  const { amount } = req.body;
  const isSubscribe = req.body.is_subscribe;

  if (!userId || !bookId || !amount) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await cartService.createCart(userId, bookId, amount, isSubscribe);

  return res.status(201).json({ message: 'PRODUCT_ADDED_TO_CART' });
});

module.exports = {
  createCart,
};
