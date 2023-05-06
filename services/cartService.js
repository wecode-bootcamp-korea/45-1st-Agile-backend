const cartDao = require('../models/cartDao');

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
  modifyQuantity,
  modifyQuantityResult,
};
