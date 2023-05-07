const cartDao = require('../models/cartDao');
const bookDao = require('../models/bookDao');

const createCart = async (userId, bookId, amount, isSubscribe) => {
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

  return cartDao.createCart(userId, bookId, amount, isSubscribe);
};

const checkCart = async (userId, bookId) => {
  return await cartDao.checkCart(userId, bookId);
};

module.exports = {
  createCart,
  checkCart,
};
