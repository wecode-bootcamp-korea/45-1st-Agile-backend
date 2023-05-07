const cartDao = require('../models/cartDao');

const modifyQuantity = async (userId, cartId, amount) => {
  const modifyQuantity = await cartDao.modifyQuantity(userId, cartId, amount);
  return modifyQuantity;
};

module.exports = {
  modifyQuantity,
};
