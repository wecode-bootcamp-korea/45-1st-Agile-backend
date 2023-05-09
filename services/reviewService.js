const reviewDao = require('../models/reviewDao');

const getReviewsByBookId = async (bookId, limit, offset) => {
  const reviews = await reviewDao.getReviewsByBookId(bookId, limit, offset);
  const reviewsCount = await reviewDao.getReviewsCountByBookId(bookId);

  return { reviewsCount, reviews };
};

const isExistedReview = (bookId) => {
  return reviewDao.isExistedReview(bookId);
};

module.exports = {
  getReviewsByBookId,
  isExistedReview,
};
