const orderDao = require('../models/orderDao');
const cartDao = require('../models/cartDao');
const bookDao = require('../models/bookDao');
const { v4: uuidv4 } = require('uuid');

const completeOrder = async (
  address,
  user,
  subscribeDeliveryTime,
  bookId,
  quantity
) => {
  try {
    const orderNumber = uuidv4();

    const book = await bookDao.getBookById(bookId);

    const totalPrice = book.price * quantity;

    if (user.point < totalPrice) {
      const error = new Error('INSUFFICIENT_BALANCE');
      error.statusCode = 400;
      throw error;
    }

    const pointReward = totalPrice > 70000 ? totalPrice * 0.02 : 0;
    const netPoint = user.points - totalPrice + pointReward;

    const order = await orderDao.completeOrder(
      user.id,
      orderNumber,
      address,
      netPoint,
      subscribeDeliveryTime,
      bookId,
      quantity
    );

    return order;
  } catch (error) {
    error = new Error(error.message);
    error.statusCode = 400;
    throw error;
  }
};

const completeOrders = async (
  address,
  user,
  subscribeDeliveryTime,
  cartIds
) => {
  try {
    let totalPrice = 0;
    const orderNumber = uuidv4();

    const carts = await cartDao.getCartsById(cartIds);

    carts.forEach((cart) => {
      totalPrice += totalPrice + cart.amount * cart.price;
    });

    if (user.point < totalPrice) {
      const error = new Error('INSUFFICIENT_BALANCE');
      error.statusCode = 400;
      throw error;
    }

    const pointReward = totalPrice > 70000 ? totalPrice * 0.02 : 0;
    const netPoint = user.points - totalPrice + pointReward;

    const order = await orderDao.completeOrders(
      user.id,
      orderNumber,
      address,
      netPoint,
      subscribeDeliveryTime,
      carts
    );

    return order;
  } catch (error) {
    error = new Error(error.message);
    error.statusCode = 400;
    throw error;
  }
};

const getOrder = async (orderNumber) => {
  return await orderDao.getOrder(orderNumber);
};

const getOrderStatus = async (userId) => {
  return orderDao.getOrderStatus(userId);
};

const getOrderStatusCount = async (userId) => {
  return orderDao.getOrderStatusCount(userId);
};

module.exports = {
  completeOrder,
  completeOrders,
  getOrder,
  getOrderStatus,
  getOrderStatusCount,
};
