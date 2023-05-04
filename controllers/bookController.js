const bookService = require('../services/bookService');
const { catchAsync } = require('../middlewares/error');

const createBookList = catchAsync(async (req, res) => {
  const {
    title,
    subtitle,
    author,
    issueDate,
    description,
    thumbnail,
    price,
    quantity,
    subCategoryId,
    isSubscribe,
  } = req.body;

  await bookService.createBookList(
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
  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

const getBookList = catchAsync(async (req, res) => {
  const { categoryId, subCategoryId, orderBy, limit, offset } = req.query;
  const result = await bookService.getBookList(
    categoryId,
    subCategoryId,
    orderBy,
    limit,
    offset
  );
  return res.status(200).json({ message: 'GET SUCCESS', data: result });
});

module.exports = {
  createBookList,
  getBookList,
};