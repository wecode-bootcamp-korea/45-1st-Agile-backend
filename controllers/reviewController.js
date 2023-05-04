const reviewService = require('../services/reviewService.js');
const { catchAsync } = require('../middlewares/error.js');

const getReviewsByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const { limit } = req.query ? req.query : 5;
  const { offset } = req.query ? req.query : 0;

  const reviews = await reviewService.getReviewsByBookId(bookId, limit, offset);

  return res.status(200).json({ reviews });
});

module.exports = {
  getReviewsByBookId,
};
