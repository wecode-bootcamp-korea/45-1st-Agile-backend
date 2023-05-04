const reviewService = require('../services/reviewService.js');
const { catchAsync } = require('../middlewares/error.js');

const getReviewsByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;

  const reviews = await reviewService.getReviewsByBookId(bookId, limit, offset);

  return res.status(200).json({ reviews });
});

module.exports = {
  getReviewsByBookId,
};
