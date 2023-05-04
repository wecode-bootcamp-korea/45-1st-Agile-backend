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

const getBookList = async (categoryId, subCategoryId, orderBy) => {
  const subcategoryBooks = await bookDao.getBookList(
    categoryId,
    subCategoryId,
    orderBy
  );

  return subcategoryBooks;
};

module.exports = {
  createBookList,
  getBookList,
};
