const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('', bookController.createBookList);
router.get('', bookController.getFiltering);

module.exports = {
  router,
};
