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

const completeOrder = async (
  userId,
  orderNumber,
  address,
  netPoint,
  SubscribeDeliveryTime,
  carts
) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  const orderStatusId = await getOrderStatusId('배송준비중');

  try {
    // - create order
    const result = await queryRunner.query(
      `
          INSERT INTO orders (
              order_number,
              address,
              user_id,
              subscribe_delivery_time,
              order_status_id
              ) VALUES (
            ?, ?, ?, ?, ?
          )
        `,
      [orderNumber, address, userId, SubscribeDeliveryTime, orderStatusId.id]
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

    // create order items
    const updates = carts.map((cart) => [
      cart.amount,
      cart.bookId,
      result.insertId,
    ]);

    await queryRunner.query(
      `INSERT INTO order_items (
        quantity,
        book_id,  
        order_id 
      ) VALUES ?
      `,
      [updates]
    );

    // update user point
    await queryRunner.query(
      `
      UPDATE users
      SET points = ?
      WHERE id = ? 
        `,
      [netPoint, userId]
    );

    // delete cart
    const cartIds = carts.map((cart) => cart.id);

    await queryRunner.query(
      `
        DELETE FROM carts
        WHERE id IN (?)
      `,
      [cartIds]
    );

    await queryRunner.commitTransaction();

    return order;
  } catch (error) {
    await queryRunner.rollbackTransaction();

    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  } finally {
    if (queryRunner) {
      await queryRunner.release();
    }
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

module.exports = {
  getOrderStatusId,
  completeOrder,
  getOrder,
  getOrderStatusId,
};
