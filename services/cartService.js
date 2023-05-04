const cartDao = require('../models/cartDao');

const createCart = async (userId, bookId, amount, isSubscribe) => {
  if (checkCart(userId, bookId)) {
    const error = new Error('BOOK_EXISTS_IN_CART');
    error.statusCode = 400;
    throw error;
  }

  return await cartDao.createCart(userId, bookId, amount, isSubscribe);
};

const checkCart = async (userId, bookId) => {
  return await cartDao.checkCart(userId, bookId);
};

module.exports = {
  createCart,
  checkCart,
};
