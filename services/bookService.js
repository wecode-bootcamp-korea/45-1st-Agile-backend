const bookDao = require('../models/bookDao');

const getBookById = async (bookId) => {
  const book = await bookDao.getBookById(bookId);

  if (!book) {
    const error = new Error('BOOK_DOES_NOT_EXIST');
    error.statusCode = 404;
    throw error;
  }
  return book;
};

module.exports = {
  getBookById,
};
