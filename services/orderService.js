const orderDao = require('../models/orderDao');
const bookDao = require('../models/bookDao');
const userDao = require('../models/userDao');
const { v4: uuidv4 } = require('uuid');
const { dataSource } = require('../models/dataSource');

const completeOrders = async (address, userId, bookIdAndQuantity) => {
  let queryRunner;

  try {
    queryRunner = dataSource.createQueryRunner();

    await queryRunner.startTransaction();

    let points = 0;

    for (let i = 0; i < bookIdAndQuantity.length; i++) {
      const bookId = bookIdAndQuantity[i].bookId;

      const book = await bookDao.getBookById(bookId);

      const bookPrice = book.price;
      const quantity = bookIdAndQuantity[i].quantity;

      const point = bookPrice * quantity;

      points += point;
    }

    const user = await userDao.getUserById(userId);
    const userPoints = user.points;

    if (userPoints < points) {
      const error = new Error('INSUFFICIENT_BALANCE');
      error.statusCode = 404;
      throw error;
    }

    const orderNumber = uuidv4();
    const orderStatusId = await orderDao.getOrderStatusId('배송준비중');

    await orderDao.createOrder(orderNumber, address, userId, orderStatusId.id);

    for (let i = 0; i < bookIdAndQuantity.length; i++) {
      const order = await getOrder(orderNumber);
      const orderId = order.id;

      const quantity = bookIdAndQuantity[i].quantity;
      const bookId = bookIdAndQuantity[i].bookId;

      await orderDao.createOrderItems(quantity, bookId, orderId);
    }

    await userDao.updateUserPoints(userId, points);

    await queryRunner.commitTransaction();

    return;
  } catch (error) {
    await queryRunner.rollbackTransaction();

    error = new Error('CONNECTION_LOST');
    error.statusCode = 400;
    throw error;
  } finally {
    if (queryRunner) {
      await queryRunner.release();
    }
  }
};

const getOrder = async (orderNumber) => {
  return await orderDao.getOrder(orderNumber);
};

const createOrderItems = async (quantity, bookId, orderId) => {
  return await orderDao.createOrderItems(quantity, bookId, orderId);
};

module.exports = {
  completeOrders,
  getOrder,
  createOrderItems,
};
