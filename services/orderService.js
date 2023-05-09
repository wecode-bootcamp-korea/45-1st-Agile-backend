const orderDao = require('../models/orderDao');
const bookDao = require('../models/bookDao');
const userDao = require('../models/userDao');
const { v4: uuidv4 } = require('uuid');
const { dataSource } = require('../models/dataSource');

const completeOrders = async (address, user, SubscribeDeliveryTime, cartId) => {
  try {
    let totalPrice = 0;
    const orderNumber = uuidv4();
    const carts = await cartDao.getCartsById(cartId);

    carts.forEach((cart) => {
      totalPrice += totalPrice + cart.price * cart.quantity;
    });
    //내 point랑 총 가격이랑 비교
    if (user.point < totalPrice) {
      const error = new Error('INSUFFICIENT_BALANCE');
      error.statusCode = 400;
      throw error;
    }
    const pointReward = totalPrice > 70000 ? totalPrice * 0.02 : 0;
    const netPoint = user.point - totalPrice + pointReward;

    await orderDao.createOrder(
      user.id,
      orderNumber,
      address,
      netPoint,
      SubscribeDeliveryTime,
      orderStatusId
    );

    return order;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    error = new Error(error.message);
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
