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

const getBookCount = async (categoryId, subCategoryId) => {
  const booksCount = await bookDao.getBookCount(categoryId, subCategoryId);

  return booksCount;
};

const getBookById = async (bookId) => {
  const [book] = await bookDao.getBookById(bookId);

  if (!book) {
    const error = new Error('BOOK_DOES_NOT_EXIST');
    error.statusCode = 404;
    throw error;
  }
  return book;
};

const modifyReview = async (userId, reviewId, content, score) => {
  const review = bookDao.modifyReview(userId, reviewId, content, score);

  if (!content || !score) {
    const error = new Error('CHECK DATA');
    error.status(400);
    throw error;
  }
  return review;
};

module.exports = {
  createBookList,
  getBookList,
  getBookCount,
  getBookById,
  modifyReview,
};
