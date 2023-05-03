const express = require('express');

const userRouter = require('./userRouter');
// const bookRouter = require('./bookRouter');
const likeRouter = require('./likeRouter');

const router = express.Router();

router.use('/users', userRouter.router);
// router.use('/books', bookRouter.router);
router.use('/likes', likeRouter.router);

module.exports = router;
