const express = require('express');

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const paymentRouter = require('./paymentRouter.js');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/books', bookRouter.router);
router.use('/payments', paymentRouter.router);

module.exports = router;
