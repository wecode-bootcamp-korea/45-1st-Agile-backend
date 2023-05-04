const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('', bookController.createBookList);
router.get('', bookController.getBookList);
router.get('/:bookId', bookController.getBookById);

module.exports = {
  router,
};
