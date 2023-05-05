const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.get('/user', validateToken, paymentController.getUserInfo);

module.exports = {
  router,
};
