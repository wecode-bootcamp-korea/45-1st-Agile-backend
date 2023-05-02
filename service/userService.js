const bcrypt = require('bcrypt');

const userDao = require('../model/userDao');
const {
  pwValidationCheck,
  emailValidationCheck,
} = require('../utils/validation-check.js');

const signUp = async (
  email,
  password,
  name,
  phoneNumber,
  adress,
  gender,
  birthDate,
  points
) => {
  await pwValidationCheck(password);
  await emailValidationCheck(email);

  const saltRounds = 5;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(
    email,
    hashedPassword,
    name,
    phoneNumber,
    adress,
    gender,
    birthDate,
    points
  );

  return createUser;
};

module.exports = {
  signUp,
};
