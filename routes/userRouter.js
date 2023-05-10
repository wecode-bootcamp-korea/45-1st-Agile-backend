const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('', validateToken, userController.getUserInfo);
router.patch('/password', validateToken, userController.modifyPassword);
router.patch('/information', validateToken, userController.modifyInformation);
router.post('/auth-check', validateToken, userController.authCheck);
router.get('/orders', validateToken, userController.getOrderStatus);

module.exports = {
  router,
};
