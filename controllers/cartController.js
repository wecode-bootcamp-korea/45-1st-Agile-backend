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
  const { cartId, quantity } = req.body;
  const result = await cartService.modifyQuantity(userId, cartId, quantity);

  if (!result) return res.status(400).json({ message: 'MODIFY FAIL' });

  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

const deleteBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.query;
  //:3000/carts?cartId=1&cartId=2
  //:3000/carts?cartId=1,2 -> cartId.split(',')

  const result = await cartService.deleteBooks(userId, cartId);

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
