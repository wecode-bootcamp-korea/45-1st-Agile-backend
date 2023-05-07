const express = require('express');

const orderController = require('../controllers/orderController.js');

const router = express.Router();

const { validateToken } = require('../middlewares/auth.js');

router.post('', validateToken, orderController.completeOrders);

router.get('/user', validateToken, orderController.getUserInfo);

module.exports = {
  router,
};
