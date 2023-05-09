const orderDao = require('../models/orderDao');
const cartDao = require('../models/cartDao');
const bookDao = require('../models/bookDao');
const { v4: uuidv4 } = require('uuid');

const completeOrders = async (
  address,
  user,
  SubscribeDeliveryTime,
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

    const order = await orderDao.completeOrder(
      user.id,
      orderNumber,
      address,
      netPoint,
      SubscribeDeliveryTime,
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

const createOrderItems = async (quantity, bookId, orderId) => {
  return await orderDao.createOrderItems(quantity, bookId, orderId);
};

module.exports = {
  completeOrders,
  getOrder,
  createOrderItems,
};
