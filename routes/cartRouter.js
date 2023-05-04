const express = require('express');
const cartController = require('../controllers/cartController.js');

const { validateToken } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/:bookId', validateToken, cartController.createCart);

module.exports = {
  router,
};
