const express = require('express');
const cartController = require('../controllers/cartController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.delete('', validateToken, cartController.deleteBook);

module.exports = {
  router,
};
