const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

const { validateTokenUserUndefiened } = require('../middlewares/auth');

router.post('', bookController.createBookList);
router.get('', bookController.getBookList);
router.get('/:bookId', validateTokenUserUndefiened, bookController.getBookById);

module.exports = {
  router,
};
