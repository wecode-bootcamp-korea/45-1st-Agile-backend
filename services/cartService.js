const cartDao = require('../models/cartDao');
const bookDao = require('../models/bookDao');

const createCart = async (
  userId,
  bookId,
  amount,
  isSubscribe,
  subscribeCycle
) => {
  if (!bookDao.isExistedBook(bookId)) {
    const error = new Error('BOOK_DOES_NOT_EXIST');
    error.statusCode = 400;
    throw error;
  }

  if (await checkCart(userId, bookId)) {
    const error = new Error('BOOK_EXISTS_IN_CART');
    error.statusCode = 400;
    throw error;
  }

  return cartDao.createCart(
    userId,
    bookId,
    amount,
    isSubscribe,
    subscribeCycle
  );
};

const checkCart = async (userId, bookId) => {
  return await cartDao.checkCart(userId, bookId);
};

const getCarts = async (userId) => {
  const cartList = await cartDao.getCarts(userId);
  return cartList;
};

const modifyQuantity = async (userId, cartId, amount) => {
  const modifyQuantity = await cartDao.modifyQuantity(userId, cartId, amount);
  return modifyQuantity;
};

const deleteBooks = async (userId, cartId) => {
  return await cartDao.deleteBooks(userId, cartId);
};

const addExistBook = async (userId, bookId, amount) => {
  return await cartDao.addExistBook(userId, bookId, amount);
};

module.exports = {
  createCart,
  checkCart,
  getCarts,
  modifyQuantity,
  deleteBooks,
  addExistBook,
};
