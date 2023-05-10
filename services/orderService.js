const orderDao = require('../models/orderDao');
const cartDao = require('../models/cartDao');
const bookDao = require('../models/bookDao');
const { v4: uuidv4 } = require('uuid');

const completeOrders = async (
  address,
  user,
  subscribeDeliveryTime,
  cartIds
) => {
  try {
    let totalPrice = 0;
    const orderNumber = uuidv4();
    console.log(cartIds);
    const carts = await cartDao.getCartsById(cartIds);
    console.log(carts);
    console.log('---------1----------');
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
    console.log('---------2----------');
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

module.exports = {
  completeOrders,
  getOrder,
};
