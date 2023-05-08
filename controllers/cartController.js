const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

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

const getCarts = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCarts(userId);
  return res.status(200).json({ message: 'GET SUCCESS', data: result });
});

const modifyQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId, amount } = req.body;
  const result = await cartService.modifyQuantity(userId, cartId, amount);

  if (!result) return res.status(400).json({ message: 'MODIFY FAIL' });

  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

module.exports = {
  createCart,
  getCarts,
  modifyQuantity,
};
