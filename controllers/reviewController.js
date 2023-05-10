const reviewService = require('../services/reviewService.js');
const { catchAsync } = require('../middlewares/error.js');

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;
  const { content, score } = req.body;

  await reviewService.createReview(userId, bookId, content, score);
  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

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

  if (!content || !score) {
    const error = new Error('CHECK DATA');
    error.status(400);
    throw error;
  }

  const result = await reviewService.modifyReview(
    userId,
    reviewId,
    content,
    score
  );

  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

module.exports = {
  createReview,
  getReviewsByBookId,
  modifyReview,
};
