const bookDao = require('../models/bookDao');

const getBookById = (bookId) => {
  return bookDao.getBookById(bookId);
};

module.exports = {
  getBookById,
};
