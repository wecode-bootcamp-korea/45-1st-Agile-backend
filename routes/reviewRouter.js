const express = require('express');
const reviewController = require('../controllers/reviewController.js');

const router = express.Router();

router.get('/:bookId', reviewController.getReviewsByBookId);

module.exports = {
  router,
};
