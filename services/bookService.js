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

const getFiltering = async (categoryId, subCategoryId) => {
  const subcategoryBooks = await bookDao.getFiltering(
    categoryId,
    subCategoryId
  );

  return subcategoryBooks;
};

module.exports = {
  createBookList,
  getFiltering,
};
