const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('', validateToken, userController.getUserInfo);

module.exports = {
  router,
};
