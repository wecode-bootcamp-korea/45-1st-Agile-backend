const bookDao = require('../models/bookDao');

const getBookById = async (bookId) => {
  if (!(await isExistedBook(bookId))) {
    const error = new Error('BOOK_DOES_NOT_EXIST');
    error.statusCode = 400;
    throw error;
  }

  return bookDao.getBookById(bookId);
};

const isExistedBook = async (bookId) => {
  return bookDao.isExistedBook(bookId);
};

module.exports = {
  getBookById,
  isExistedBook,
};
