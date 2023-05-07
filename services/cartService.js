const cartDao = require('../models/cartDao');

const getCarts = async (userId) => {
  const cartList = await cartDao.getCarts(userId);
  return cartList;
};

module.exports = {
  getCarts,
};
