const express = require('express');

const bookRouter = require('./bookRouter');

const router = express.Router();

router.use('/book', bookRouter.router);

module.exports = router;
