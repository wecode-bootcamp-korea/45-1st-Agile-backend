const userDao = require('../models/userDao.js');

const getUserInfo = async (userId) => {
  const user = await userDao.getUserById(userId);

  if (!user) {
    const error = new Error('USER_DOES_NOT_EXIST');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

module.exports = {
  getUserInfo,
};
