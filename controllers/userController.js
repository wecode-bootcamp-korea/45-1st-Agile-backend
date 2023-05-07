const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

const signUp = catchAsync(async (req, res) => {
  const {
    email,
    password,
    name,
    phoneNumber,
    address,
    gender,
    birthDate,
    points = parseFloat(process.env.POINTS) || 500000.0,
  } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !phoneNumber ||
    !address ||
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
    address,
    gender,
    birthDate,
    points
  );

  return res.status(201).json({
    message: 'SIGNUP_SUCCESS',
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await userService.login(email, password);

  return res.status(200).json({ accessToken });
});

module.exports = {
  signUp,
  login,
};
