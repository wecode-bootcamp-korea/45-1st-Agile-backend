const orderDao = require('../models/orderDao');
const bookDao = require('../models/bookDao');
const userDao = require('../models/userDao');
const { v4: uuidv4 } = require('uuid');
const { dataSource } = require('../models/dataSource');

const completeOrders = async (
  address,
  userId,
  SubscribeDeliveryTime,
  bookIdAndQuantity
) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    let totalPayment = 0;
    const bookIds = bookIdAndQuantity.map((item) => item.bookId);

    const booksPrice = await bookDao.getBooksPrice(bookIds);

    for (let i = 0; i < bookIdAndQuantity.length; i++) {
      const bookPrice = booksPrice[i].price;

      const quantity = bookIdAndQuantity[i].quantity;
      const point = bookPrice * quantity;
      totalPayment += point;
    }

    const user = await userDao.getUserById(userId);
    const userPoints = user.points;
    console.log('-----1-----');
    if (userPoints < totalPayment) {
      const error = new Error('INSUFFICIENT_BALANCE');
      error.statusCode = 404;
      throw error;
    }

    const orderNumber = uuidv4();
    const orderStatusId = await orderDao.getOrderStatusId('배송준비중');
    console.log('-----2-----');
    const order = await orderDao.createOrder(
      orderNumber,
      address,
      SubscribeDeliveryTime,
      userId,
      orderStatusId.id
    );
    console.log('-----3-----');
    for (let i = 0; i < bookIdAndQuantity.length; i++) {
      const order = await getOrder(orderNumber);
      const orderId = order.id;

      const quantity = bookIdAndQuantity[i].quantity;
      const bookId = bookIdAndQuantity[i].bookId;

      await orderDao.createOrderItems(quantity, bookId, orderId);

      const book = await bookDao.getBookById(bookId);

      if (quantity > book.quantity) {
        const error = new Error('OUT_OF_STOCK');
        error.statusCode = 404;
        throw error;
      }
      console.log('-----4-----');
      await bookDao.modifyBookQuantity(bookId, quantity);
      console.log('-----4.5-----');
    }
    console.log('-----5-----');
    await userDao.updateUserPoints(userId, totalPayment, '-');
    console.log('-----6-----');
    if (totalPayment > 70000) {
      pointReward = totalPayment * 0.02;
      await userDao.updateUserPoints(userId, pointReward, '+');
    }

    await queryRunner.commitTransaction();

    return order;
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
