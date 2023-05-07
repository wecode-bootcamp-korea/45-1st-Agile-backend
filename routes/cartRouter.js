const express = require('express');
const cartController = require('../controllers/cartController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('', validateToken, cartController.getCarts);
router.post('', validateToken, cartController.modifyQuantity);

module.exports = {
  router,
};
