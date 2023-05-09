const express = require('express');
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('', bookController.createBookList);
router.get('', bookController.getBookList);
router.get('/:bookId', bookController.getBookById);
router.delete(
  '/review/:reviewId',
  validateToken,
  reviewController.deleteReview
);
router.get('/:bookId/reviews', reviewController.getReviewsByBookId);
router.patch('/review/:reviewId', validateToken, reviewController.modifyReview);

module.exports = {
  router,
};
