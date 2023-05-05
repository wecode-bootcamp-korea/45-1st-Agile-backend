const paymentDao = require('../models/bookDao');

const createOrder = async (address, userId, quantity, bookId) => {
  const order = await paymentDao.createOrder(address, userId);

  const orderItems = await paymentDao.createOrder(quantity, bookId);

  return [order, orderItems];
};
module.exports = {
  createOrder,
  createOrderItems,
};
