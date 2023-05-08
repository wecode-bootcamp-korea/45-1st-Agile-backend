const express = require('express');
<<<<<<< HEAD
const cartController = require('../controllers/cartController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.get('', validateToken, cartController.getCarts);
=======
const cartController = require('../controllers/cartController.js');

const { validateToken } = require('../middlewares/auth.js');

const router = express.Router();

router.post('', validateToken, cartController.createCart);
>>>>>>> main

module.exports = {
  router,
};
