const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

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

const getCarts = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCarts(userId);
  return res.status(200).json({ message: 'GET SUCCESS', data: result });
});

const modifyQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, button } = req.body;
  const modifyQuantity = await cartService.modifyQuantity(
    userId,
    bookId,
    button
  );
  if (!modifyQuantity)
    return res.status(400).json({ message: 'Failed, ease check the data!' });
  const result = await cartService.modifyQuantityResult(userId, bookId);
  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

const deleteBook = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;
  const result = await cartService.deleteBook(userId, bookId);
  if (!result)
    return res.status(400).json({ message: 'Failed, ease check the data!' });
  return res.status(200).json({ message: 'DELETE SUCCESS' });
});

const deleteBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const bookId = req.body.book_id;
  const result = await cartService.deleteBooks(userId, bookId);
  if (!result)
    return res.status(400).json({ message: 'Failed, ease check the data!' });
  res.status(200).json({ message: 'DELETE SUCCESS' });
});

module.exports = {
  createCart,
  modifyQuantity,
  getCarts,
  deleteBook,
  deleteBooks,
};
