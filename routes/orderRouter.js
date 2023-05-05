const express = require('express');

const orderController = require('../controllers/orderController.js');

const router = express.Router();

const { validateToken } = require('../middlewares/auth.js');

router.post('', validateToken, orderController.createOrder);

module.exports = { router };
