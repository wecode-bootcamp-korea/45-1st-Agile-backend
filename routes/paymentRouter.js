const express = require('express');

const paymentController = require('../controllers/paymentController.js');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.post('/order', validateToken, paymentController.getUserInfo);

module.exports = { router };
