const express = require('express');

const orderController = require('../controllers/orderController.js');
const userController = require('../controllers/userController.js');

const router = express.Router();

const { validateToken } = require('../middlewares/auth.js');

router.post('/direct', validateToken, orderController.completeOrder);

module.exports = {
  router,
};
