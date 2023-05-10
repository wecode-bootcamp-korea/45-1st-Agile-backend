const express = require('express');
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

const { validateTokenUserUndefiened } = require('../middlewares/auth');

router.post('', bookController.createBookList);
router.get('', bookController.getBookList);
router.get('/:bookId', validateTokenUserUndefiened, bookController.getBookById);
router.post('/:bookId/reviews', validateToken, reviewController.createReview);
router.get('/:bookId/reviews', reviewController.getReviewsByBookId);
router.patch('/review/:reviewId', validateToken, reviewController.modifyReview);
router.delete(
  '/review/:reviewId',
  validateToken,
  reviewController.deleteReview
);

module.exports = {
  router,
};
