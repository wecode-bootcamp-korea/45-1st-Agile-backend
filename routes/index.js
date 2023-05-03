const express = require('express');

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');

router.use('/users', userRouter.router);
router.use('/book', bookRouter.router);

const router = express.Router();

module.exports = router;
