const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.get('/user', validateToken, orderController.getUserInfo);

module.exports = {
  router,
};
