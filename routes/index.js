const express = require('express');

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const orderRouter = require('./orderRouter.js');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/books', bookRouter.router);
router.use('/orders', orderRouter.router);

module.exports = router;
