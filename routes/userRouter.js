const express = require('express');
const userController = require('../controllers/userController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.patch('', validateToken, userController.modifyInformation);

module.exports = {
  router,
};
