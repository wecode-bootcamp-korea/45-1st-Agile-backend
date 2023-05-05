const orderDao = require('../models/orderDao');
const { v4: uuidv4 } = require('uuid');

const createOrder = async (address, userId, bookId, quantity) => {
  const orderNumber = uuidv4();
  const orderStatusId = await orderDao.getOrderStatusId('배송준비중');

  await orderDao.createOrder(orderNumber, address, userId, orderStatusId.id);

  const order = await getOrder(orderNumber);
  const orderId = order.id;

  await orderDao.createOrderItems(quantity, bookId, orderId);

  return;
};

const getOrder = async (orderNumber) => {
  return await orderDao.getOrder(orderNumber);
};

const createOrderItems = async (quantity, bookId, orderId) => {
  return await orderDao.createOrderItems(quantity, bookId, orderId);
};

module.exports = {
  createOrder,
  getOrder,
  createOrderItems,
};
