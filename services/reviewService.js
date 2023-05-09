const reviewDao = require('../models/reviewDao');

const getReviewsByBookId = (bookId, limit, offset) => {
  return reviewDao.getReviewsByBookId(bookId, limit, offset);
};

const getReviewsCountByBookId = (bookId) => {
  return reviewDao.getReviewsCountByBookId(bookId);
};

const isExistedReview = (bookId) => {
  return reviewDao.isExistedReview(bookId);
};

module.exports = {
  getReviewsByBookId,
  getReviewsCountByBookId,
  isExistedReview,
};
