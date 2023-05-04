const express = require('express');

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
// const likeRouter = require('./likeRouter');
const cartRouter = require('./cartRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/books', bookRouter.router);
// router.use('/likes', likeRouter.router);
router.use('/carts', cartRouter.router);

module.exports = router;
