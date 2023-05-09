const express = require('express');
const bookController = require('../controllers/bookController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('', bookController.createBookList);
router.get('', bookController.getBookList);
router.get('/:bookId', bookController.getBookById);
router.patch('/reviews', validateToken, bookController.modifyReview);

module.exports = {
  router,
};
