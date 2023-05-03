const express = require('express');

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/book', bookRouter.router);

module.exports = router;
