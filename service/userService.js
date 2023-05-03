const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDao = require('../model/userDao');

const login = async (email, password) => {
  await emailValidationCheck(email);

  const user = await userDao.getUserByEmail(email);

  if (!user || !bcrypt.compare(password, user.password)) {
    const err = new Error('INVALID_EMAIL_OR_PASSWORD');
    err.statusCode = 401;
    throw err;
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const getUserById = async (id) => {
  return userDao.getUserById(id);
};

module.exports = {
  signUp,
  login,
  getUserById,
};
