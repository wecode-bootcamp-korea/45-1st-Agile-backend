const reviewDao = require('../models/reviewDao');

const createReview = async (userId, bookId, content, score) => {
  return reviewDao.createReview(userId, bookId, content, score);
};

const getReviewsByBookId = async (bookId, limit, offset) => {
  const reviews = await reviewDao.getReviewsByBookId(bookId, limit, offset);
  const reviewsCount = await reviewDao.getReviewsCountByBookId(bookId);

  return { reviewsCount, reviews };
};

const isExistedReview = (bookId) => {
  return reviewDao.isExistedReview(bookId);
};

const modifyReview = async (userId, reviewId, content, score) => {
  const review = reviewDao.modifyReview(userId, reviewId, content, score);

  if (!content || !score) {
    const error = new Error('CHECK DATA');
    error.status(400);
    throw error;
  }
  return review;
};

module.exports = {
  createReview,
  getReviewsByBookId,
  isExistedReview,
  modifyReview,
};
