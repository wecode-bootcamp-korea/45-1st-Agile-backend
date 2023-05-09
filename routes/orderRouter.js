const express = require('express');

const orderController = require('../controllers/orderController.js');
const { validateToken } = require('../middlewares/auth.js');

const router = express.Router();

router.post('', validateToken, orderController.completeOrders);

module.exports = {
  router,
};
