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

const getCarts = async (userId) => {
  const cartList = await cartDao.getCarts(userId);
  return cartList;
};

const modifyQuantity = async (userId, bookId, button) => {
  const modifyQuantity = await cartDao.modifyQuantity(userId, bookId, button);
  return modifyQuantity;
};

const modifyQuantityResult = async (userId, bookId) => {
  const modifyQuantityResult = await cartDao.modifyQuantityResult(
    userId,
    bookId
  );
  return modifyQuantityResult;
};

const deleteBook = async (userId, bookId) => {
  const deleteBooks = await cartDao.deleteBook(userId, bookId);
  return deleteBooks;
};

const deleteBooks = async (userId, bookId) => {
  for (let i = 0; i < bookId.length; i++) {
    const deleteBooks = await cartDao.deleteBooks(userId, bookId[i]);
  }
  return deleteBooks;
};

module.exports = {
  createCart,
  checkCart,
  getCarts,
  modifyQuantity,
  modifyQuantityResult,
  deleteBook,
  deleteBooks,
};
