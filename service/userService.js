const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDao = require('../models/userDao');
const { emailValidationCheck } = require('../utils/validation-check.js');

const login = async (email, password) => {
  emailValidationCheck(email);

  const user = await userDao.getUserByEmail(email);

  if (!user || !bcrypt.compare(password, user.password)) {
    const err = new Error('INVALID_EMAIL_OR_PASSWORD');
    err.statusCode = 401;
    throw err;
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

module.exports = {
  login,
};
