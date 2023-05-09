const { dataSource } = require('./dataSource');

const getOrderStatusId = async (orderStatus) => {
  try {
    const [orderStatusId] = await dataSource.query(
      `
          SELECT id
              FROM order_status
              WHERE status = ?
          `,
      [orderStatus]
    );
    return orderStatusId;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const createOrder = async (
  orderNumber,
  address,
  netPoint,
  SubscribeDeliveryTime,
  userId,
  orderStatusId
) => {
  // - create order
  // - create order items
  // - update user point
  // - delete cart
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  const orderStatusId = await orderDao.getOrderStatusId('배송준비중');

  try {
    const result = await queryRunner.query(
      `
      INSERT INTO orders (
          order_number,
          user_id,
          address,
          subscribe_delivery_time,
          order_status_id
          ) VALUES (
        ?, ?, ?, ?, ?
      )
        `,
      [orderNumber, userId, address, SubscribeDeliveryTime, orderStatusId]
    );

    await queryRunner.query(
      `
      UPDATE users
      SET points = ?
      WHERE id = ? 
        `,
      [netPoint, userId]
    );

    const [order] = await queryRunner.query(
      `SELECT 
        o.id,
        o.order_number,
        o.address,
        o.subscribe_delivery_time,
        o.user_id,
        os.status
      FROM orders o
      JOIN order_status os ON o.order_status_id = os.id
      WHERE o.id = ?
        `,
      [result.insertId]
    );

    await queryRunner.commitTransaction();

    return order;
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
    const error = new Error('appDataSource error');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};

const getOrder = async (orderNumber) => {
  try {
    const [order] = await dataSource.query(
      `
        SELECT id, order_number, address, subscribe_delivery_time, user_id, order_status_id
            FROM orders
            WHERE order_number = ?
        `,
      [orderNumber]
    );
    return order;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};
/*const createOrderItems = async (quantity, bookId, orderId) => {
  try {
    const result = await dataSource.query(
      `
        INSERT INTO order_items (
            quantity,
            book_id,
            order_id
        ) VALUES (
            ?, ?, ?
        )
        `,
      [quantity, bookId, orderId]
    );
    return result;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};*/

const createOrderItems = async (bookIdAndQuantity, orderId) => {
  try {
    let values = [];

    for (const item of bookIdAndQuantity) {
      values.push(`(${item.bookId}, ${item.quantity}, ${orderId})`);
    }

    const result = await dataSource.query(
      `
        INSERT INTO order_items (
            book_id,
            quantity,
            order_id
        ) VALUES 
            ${values.join(',')}
        `
    );
    return result;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getOrderStatusId,
  createOrder,
  getOrder,
  createOrderItems,
  getOrderStatusId,
};
