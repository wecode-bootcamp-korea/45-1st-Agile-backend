const cartDao = require('../models/cartDao');

const deleteBooks = async (userId, cartId) => {
  return await cartDao.deleteBooks(userId, cartId);
};

module.exports = {
  deleteBooks,
};
