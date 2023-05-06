const cartDao = require('../models/cartDao');

const modifyAmount = async (userId, bookId, amount) => {
  const modifyAmount = await cartDao.modifyAmount(userId, bookId, amount);
  return modifyAmount;
};

const modifyResultAmount = async (userId, bookId) => {
  const modifyResultAmount = await cartDao.modifyResultAmount(userId, bookId);
  return modifyResultAmount;
};

module.exports = {
  modifyAmount,
  modifyResultAmount,
};
