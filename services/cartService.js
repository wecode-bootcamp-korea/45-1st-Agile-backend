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

module.exports = {
  getCarts,
  modifyQuantity,
  modifyQuantityResult,
};
