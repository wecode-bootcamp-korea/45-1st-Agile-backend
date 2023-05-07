const express = require('express');
const cartController = require('../controllers/cartController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.patch('', validateToken, cartController.modifyQuantity);

module.exports = {
  router,
};
