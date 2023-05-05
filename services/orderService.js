const orderDao = require('../models/bookDao');

const createOrder = async (address, userId, quantity, bookId) => {
  const order = await orderDao.createOrder(address, userId);

  const orderItems = await orderDao.createOrder(quantity, bookId);

  return [order, orderItems];
};
module.exports = {
  createOrder,
  createOrderItems,
};
