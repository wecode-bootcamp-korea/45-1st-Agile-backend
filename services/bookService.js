const bookDao = require('../models/bookDao');
const likeDao = require('../models/likeDao');

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

const getBookById = async (bookId, userId) => {
  const book = await bookDao.getBookById(bookId);

  if (!book) {
    const error = new Error('BOOK_DOES_NOT_EXIST');
    error.statusCode = 404;
    throw error;
  }

  const getLike = await likeDao.checkLike(userId, bookId);

  book.isLiked = getLike;

  return book;
};

module.exports = {
  createBookList,
  getBookList,
  getBookCount,
  getBookById,
};
