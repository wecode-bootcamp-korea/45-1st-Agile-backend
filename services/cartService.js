const cartDao = require('../models/cartDao');

const deleteBooks = async (userId, bookId) => {
  const deleteBooks = await cartDao.deleteBooks(userId, bookId);
  return deleteBooks;
};

module.exports = {
  deleteBooks,
};
