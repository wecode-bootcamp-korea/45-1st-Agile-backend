const express = require('express');
const bookController = require('../controllers/bookController.js');

const router = express.Router();

router.get('/:bookId', bookController.getBookById);

module.exports = {
  router,
};
