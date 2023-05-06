const orderDao = require('../models/orderDao');
const bookDao = require('../models/bookDao');
const userDao = require('../models/userDao');
const { v4: uuidv4 } = require('uuid');

const completeOrder = async (address, userId, bookId, quantity) => {
  const book = await bookDao.getBookById(bookId);

  const points = book.price * quantity;

  const userPoints = await userDao.getUserById(userId);

  if (userPoints < points) {
    const error = new Error('INSUFFICIENT_BALANCE');
    error.statusCode = 404;
    throw error;
  }

  await userDao.updateUserPoints(userId, points);

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
  completeOrder,
  getOrder,
  createOrderItems,
};
