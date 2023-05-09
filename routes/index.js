const express = require('express');

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const cartRouter = require('./cartRouter');
const likeRouter = require('./likeRouter');
const orderRouter = require('./orderRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/books', bookRouter.router);
router.use('/carts', cartRouter.router);
router.use('/likes', likeRouter.router);
router.use('/orders', orderRouter.router);

module.exports = router;
