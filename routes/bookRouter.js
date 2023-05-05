const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/:bookId', bookController.getBookById);

module.exports = {
  router,
};
