const reviewService = require('../services/reviewService.js');
const { catchAsync } = require('../middlewares/error.js');

const getReviewsByBookId = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const { limit = 5, offset = 0 } = req.query;

  if (!bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const reviews = await reviewService.getReviewsByBookId(
    bookId,
    parseInt(limit),
    parseInt(offset)
  );

  return res.status(200).json(reviews);
});

const modifyReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { reviewId } = req.params;
  const { content, score } = req.body;

  const result = await reviewService.modifyReview(
    userId,
    reviewId,
    content,
    score
  );

  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

const deleteReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { reviewId } = req.params;

  const result = await reviewService.deleteReview(userId, reviewId);

  if (!result) return res.status(400).json({ message: 'DELETE FAIL' });

  return res.status(200).json({ message: 'DELETE SUCCESS' });
});

module.exports = {
  getReviewsByBookId,
  modifyReview,
  deleteReview,
};
