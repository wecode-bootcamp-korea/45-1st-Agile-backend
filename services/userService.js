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
  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!user || !passwordCheck) {
    const error = new Error('INVALID_EMAIL_OR_PASSWORD');
    error.statusCode = 401;
    throw error;
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const isExistedUser = async (email) => {
  return userDao.isExistedUser(email);
};

const getUserById = async (id) => {
  return userDao.getUserById(id);
};

const updateUserPoints = async (userId, points) => {
  return userDao.updateUserPoints(userId, points);
};
const modifyPassword = async (userId, password) => {
  pwValidationCheck(password);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return userDao.modifyPassword(userId, hashedPassword);
};

const modifyInformation = async (userId, phoneNumber, address) => {
  return userDao.modifyInformation(userId, phoneNumber, address);
};

const authCheck = async (userId, password) => {
  const user = await userDao.getUserById(userId);
  return bcrypt.compare(password, user.password);
};

module.exports = {
  signUp,
  login,
  isExistedUser,
  getUserById,
  updateUserPoints,
  modifyPassword,
  modifyInformation,
  authCheck,
};
