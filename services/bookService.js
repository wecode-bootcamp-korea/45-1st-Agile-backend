const bookDao = require('../models/bookDao');

const createBookList = async (
  title,
  subtitle,
  author,
  issueDate,
  description,
  thumbnail,
  price,
  quantity,
  subCategoryId,
  isSubscribe
) => {
  const bookList = await bookDao.createBookList(
    title,
    subtitle,
    author,
    issueDate,
    description,
    thumbnail,
    price,
    quantity,
    subCategoryId,
    isSubscribe
  );

  return bookList;
};

const getBookList = async (
  categoryId,
  subCategoryId,
  orderBy,
  limit,
  offset
) => {
  const bookList = await bookDao.getBookList(
    categoryId,
    subCategoryId,
    orderBy,
    limit,
    offset
  );

  return bookList;
};

const getBookById = async (bookId) => {
  const book = await bookDao.getBookById(bookId);

  if (!book) {
    const error = new Error('BOOK_DOES_NOT_EXIST');
    error.statusCode = 404;
    throw error;
  }
  return book;
};

const createReview = async (userId, bookId, content, score) => {
  if (!bookId || !content || !score) {
    const error = new Error('CHECK DATA');
    error.statusCode = 404;
    throw error;
  }

  return bookDao.createReview(userId, bookId, content, score);
};

module.exports = {
  createBookList,
  getBookList,
  getBookById,
  createReview,
};
