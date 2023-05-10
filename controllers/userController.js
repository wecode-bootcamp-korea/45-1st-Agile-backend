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

const modifyPassword = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;
  const result = await userService.modifyPassword(userId, password);

  if (!result) return res.status(400).json({ message: 'MODIFY FAIL' });
  return res.status(200).json({ message: 'MODIFY SUCCESS' });
});

const modifyInformation = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { phoneNumber, address } = req.body;
  const result = await userService.modifyInformation(
    userId,
    phoneNumber,
    address
  );

  if (!result) return res.status(400).json({ message: 'MODIFY FAIL' });
  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

const getUserInfo = catchAsync(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const user = await userService.getUserById(userId);

  return res.status(200).json({ user });
});

const authCheck = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  const checkPassword = await userService.authCheck(userId, password);

  if (!checkPassword) {
    return res.status(400).json({ message: 'AUTH FAIL' });
  }

  return res.status(200).json({ message: 'AUTH SUCCESS' });
});

const getOrderStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await userService.getOrderStatus(userId);
  return res.status(200).json({ message: 'ORDER GET SUCCESS', data: result });
});

module.exports = {
  signUp,
  login,
  modifyPassword,
  modifyInformation,
  getUserInfo,
  authCheck,
  getOrderStatus,
};
