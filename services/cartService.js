const cartDao = require('../models/cartDao');

const deleteBook = async (userId, bookId) => {
  const deleteBooks = await cartDao.deleteBook(userId, bookId);
  return deleteBooks;
};

module.exports = {
  deleteBook,
};
