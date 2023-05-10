const orderDao = require('../models/orderDao');

const getOrderStatus = async (userId) => {
  return orderDao.getOrderStatus(userId);
};

const getOrderStatusCount = async (userId) => {
  return await orderDao.getOrderStatusCount(userId);
};

module.exports = {
  getOrderStatus,
  getOrderStatusCount,
};
