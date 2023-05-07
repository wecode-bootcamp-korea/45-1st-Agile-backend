const cartDao = require('../models/cartDao');

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
  getCarts,
  modifyQuantity,
  modifyQuantityResult,
  deleteBook,
  deleteBooks,
};
