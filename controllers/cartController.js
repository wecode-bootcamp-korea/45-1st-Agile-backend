const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

const createCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, amount, isSubscribe, subscribeCycle } = req.body;

  if (!bookId || !amount) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const cart = await cartService.createCart(
    userId,
    bookId,
    amount,
    isSubscribe,
    subscribeCycle
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

const deleteBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.query;
  const result = await cartService.deleteBooks(userId, cartId);

  if (!result) return res.status(400).json({ message: 'DELETE FAIL' });
  res.status(200).json({ message: 'DELETE SUCCESS' });
});

const addExistBook = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, amount } = req.body;

  if (!bookId || !amount) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const result = await cartService.addExistBook(userId, bookId, amount);

  if (!result) return res.status(400).json({ message: 'MODIFY FAIL' });

  return res.status(200).json({ message: 'ADDED TO CART', data: result });
});

module.exports = {
  createCart,
  getCarts,
  modifyQuantity,
  deleteBooks,
  addExistBook,
};
