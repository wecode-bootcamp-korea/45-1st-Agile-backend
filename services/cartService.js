const cartDao = require('../models/cartDao');

const createCart = async (userId, bookId, amount, isSubscribe) => {
  //bookId의 존재 유무

  if (checkCart(userId, bookId)) {
    const error = new Error('BOOK_EXISTS_IN_CART');
    error.statusCode = 400;
    throw error;
  }

  return cartDao.createCart(userId, bookId, amount, isSubscribe);
};

const checkCart = async (userId, bookId) => {
  return await cartDao.checkCart(userId, bookId);
};

const getCarts = async (userId) => {
  const cartList = await cartDao.getCarts(userId);
  return cartList;
};

const modifyQuantity = async (userId, cartId, quantity) => {
  const modifiedCart = await cartDao.modifyQuantity(userId, cartId, quantity);
  return modifiedCart;
};

const deleteBooks = async (userId, bookId) => {
  return await cartDao.deleteBooks(userId, bookId);
};

module.exports = {
  createCart,
  checkCart,
  getCarts,
  modifyQuantity,
  deleteBooks,
};
