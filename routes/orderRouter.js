const express = require('express');

const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.post('', validateToken, orderController.completeOrders);
router.get('/user', validateToken, userController.getUserInfo);
router.get('', validateToken, orderController.getOrderStatus);

module.exports = {
  router,
};
