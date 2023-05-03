const express = require('express');
const userController = require('../controller/userController.js');

const router = express.Router();

router.post('/signup', userController.signUp);

module.exports = {
  router,
};
