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
  const subcategoryBooks = await bookDao.getBookList(
    categoryId,
    subCategoryId,
    orderBy,
    limit,
    offset
  );

  return subcategoryBooks;
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

module.exports = {
  createBookList,
  getBookList,
  getBookById,
};
