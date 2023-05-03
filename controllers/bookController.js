const bookService = require('../services/bookService.js');
const { catchAsync } = require('../middlewares/error.js');

const getBookById = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  if (!bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const book = await bookService.getBookById(bookId);

  return res.status(200).json({ book });
});

module.exports = {
  getBookById,
};
