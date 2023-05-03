const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDao = require('../models/userDao');
const {
  pwValidationCheck,
  emailValidationCheck,
} = require('../utils/validation-check.js');

const signUp = async (
  email,
  password,
  name,
  phoneNumber,
  address,
  gender,
  birthDate,
  points
) => {
  pwValidationCheck(password);
  emailValidationCheck(email);

  if (await isExistedUser(email)) {
    const error = new Error('EMAIL_EXISTS');
    error.statusCode = 400;
    throw error;
  }

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(
    email,
    hashedPassword,
    name,
    phoneNumber,
    address,
    gender,
    birthDate,
    points
  );

  return createUser;
};

const login = async (email, password) => {
  emailValidationCheck(email);

  const user = await userDao.getUserByEmail(email);

  if (!user || !bcrypt.compare(password, user.password)) {
    const error = new Error('INVALID_EMAIL_OR_PASSWORD');
    error.statusCode = 401;
    throw error;
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const isExistedUser = async (email) => {
  return userDao.isExistedUser(email);
};

module.exports = {
  signUp,
  login,
  isExistedUser,
};
