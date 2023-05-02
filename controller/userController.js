const userService = require('../service/userService.js');

const signUp = async (req, res) => {
  const {
    email,
    password,
    name,
    phoneNumber,
    adress,
    gender,
    birthDate,
    points = 100000,
  } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !phoneNumber ||
    !adress ||
    !gender ||
    !birthDate
  ) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(
    email,
    password,
    name,
    phoneNumber,
    adress,
    gender,
    birthDate,
    points
  );
  return res.status(201).json({
    message: 'SIGNUP_SUCCESS',
  });
};

module.exports = {
  signUp,
};
