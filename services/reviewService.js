const reviewDao = require('../models/reviewDao');

const getReviewsByBookId = (bookId, limit, offset) => {
  /*if (!(await isExistedReview(bookId))) {
    const error = new Error('REVIEW_DOES_NOT_EXIST');
    error.statusCode = 400;
    throw error;
  }*/

  return reviewDao.getReviewsByBookId(bookId, limit, offset);
};

const isExistedReview = (bookId) => {
  return reviewDao.isExistedReview(bookId);
};

module.exports = {
  getReviewsByBookId,
  isExistedReview,
};
