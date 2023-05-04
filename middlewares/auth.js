const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    //check if token still exists
    if (!token) {
      const err = new Error('TOKEN_DOES_NOT_EXIST');
      err.statusCode = 409;
      throw err;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    //check if user still exists
    const user = await userService.getUserById(payload.id);

    if (!user) {
      const err = new Error('INVALID_TOKEN');
      err.statusCode = 401;

      throw err;
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateToken,
};
