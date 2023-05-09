const express = require('express');
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('', bookController.createBookList);
router.get('', bookController.getBookList);
router.get('/:bookId', bookController.getBookById);
router.get('/:bookId/reviews', reviewController.getReviewsByBookId);

module.exports = {
  router,
};
