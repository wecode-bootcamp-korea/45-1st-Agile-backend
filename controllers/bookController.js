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
  return res.status(201).json({ message: 'bookCreated' });
});

const getBookList = catchAsync(async (req, res) => {
  const { categoryId, subCategoryId } = req.query;
  const result = await bookService.getBookList(categoryId, subCategoryId);
  return res
    .status(200)
    .json({ message: 'subcategoryGetSuccess', data: result });
});

module.exports = {
  createBookList,
  getBookList,
};
