const reviewDao = require('../models/reviewDao');

const getReviewsByBookId = (bookId) => {
  return reviewDao.getReviewsByBookId(bookId);
};

module.exports = {
  getReviewsByBookId,
};
