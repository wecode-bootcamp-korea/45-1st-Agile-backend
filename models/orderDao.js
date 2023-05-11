const { dataSource } = require('./dataSource');

const orderStatusEnum = Object.freeze({
  PENDING: 1,
  SHIPPING: 2,
  COMPLETE: 3,
});

const subscribeCycleEnum = Object.freeze({
  ONEWEEK: 1,
  ONEMONTH: 2,
  THREEMONTHS: 3,
});

const completeOrder = async (
  userId,
  orderNumber,
  address,
  netPoint,
  subscribeDeliveryTime,
  bookId,
  subscribeCycle,
  quantity
) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  const orderStatusId = orderStatusEnum.PENDING;

  try {
    // - create order
    const result = await queryRunner.query(
      `
          INSERT INTO orders (
              order_number,
              address,
              user_id,
              subscribe_delivery_time,
              order_status_id,
              subscribe_cycle_id
              ) VALUES (
            ?, ?, ?, ?, ?, ?
          )
        `,
      [
        orderNumber,
        address,
        userId,
        subscribeDeliveryTime,
        orderStatusId,
        subscribeCycleEnum[subscribeCycle],
      ]
    );

    // create order items
    await queryRunner.query(
      `INSERT INTO order_items (
        quantity,
        book_id,  
        order_id 
      ) VALUES (?, ?, ?)
      `,
      [quantity, bookId, result.insertId]
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

    const [order] = await queryRunner.query(
      `SELECT 
        o.id,
        o.order_number orderNumber,
        o.address,
        o.subscribe_delivery_time subscribeDeliveryTime,
        o.user_id userId,
        o.subscribe_cycle_id subscribeCycleId,
        os.status,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                  "id", oi.id,
                  "quantity", oi.quantity,
                  "bookId", oi.book_id
              )
            ) orderItems,
      (SELECT sc.delivery_cycle FROM subscribe_cycle sc WHERE sc.id = o.subscribe_cycle_id) subscribeCycle
      FROM orders o
      JOIN order_status os ON o.order_status_id = os.id
      JOIN order_items oi ON oi.order_id = o.id
      WHERE o.id = ?
        `,
      [result.insertId]
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

const completeOrders = async (
  userId,
  orderNumber,
  address,
  netPoint,
  subscribeDeliveryTime,
  carts,
  subscribeCycle
) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  const orderStatusId = orderStatusEnum.PENDING;

  try {
    // - create order
    const result = await queryRunner.query(
      `
          INSERT INTO orders (
              order_number,
              address,
              user_id,
              subscribe_delivery_time,
              subscribe_cycle_id,
              order_status_id
              ) VALUES (
            ?, ?, ?, ?, ?, ?
          )
        `,
      [
        orderNumber,
        address,
        userId,
        subscribeDeliveryTime,
        subscribeCycleEnum[subscribeCycle],
        orderStatusId,
      ]
    );

    // create order items
    const orderItems = carts.map((cart) => [
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
      [orderItems]
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

    const [order] = await queryRunner.query(
      `SELECT 
        o.id,
        o.order_number orderNumber,
        o.address,
        o.subscribe_delivery_time subscribeDeliveryTime,
        o.user_id userId,
        os.status,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                  "id", oi.id,
                  "quantity", oi.quantity,
                  "bookId", oi.book_id bookId
              )
            ) orderItems,
      (SELECT sc.delivery_cycle FROM subscribe_cycle sc WHERE sc.id = o.subscribe_cycle_id) subscribeCycle
      FROM orders o
      JOIN order_status os ON o.order_status_id = os.id
      JOIN order_items oi ON oi.order_id = o.id
      WHERE o.id = ?
        `,
      [result.insertId]
    );

    await queryRunner.commitTransaction();
    getSubscribeBooks;
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
        SELECT
          id,
          order_number orderNumber, 
          address, 
          subscribe_delivery_time subscribeDeliveryTime, 
          subscribe_cycle_id subscribeCycleId, 
          user_id userId, 
          order_status_id orderStatusId
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

const getOrderStatus = async (userId) => {
  try {
    return dataSource.query(
      `SELECT
        o.order_number orderNumber,
        os.status,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "title", b.title,
              "thumbnail", b.thumbnail,
              "price", b.price,
              "amount", oi.quantity
            )
          ) books,
        (SELECT sc.delivery_cycle FROM subscribe_cycle sc WHERE sc.id = o.subscribe_cycle_id) subscribeCycle,
        date_format(o.created_at, '%Y-%m-%d') createdAt
        FROM order_status os
        JOIN orders o ON o.order_status_id = os.id
        JOIN order_items oi ON oi.order_id = o.id
        JOIN books b ON b.id = oi.book_id
        WHERE o.user_id = ?
        GROUP BY o.order_number, os.status, o.created_at, o.subscribe_cycle_id`,
      [userId]
    );
  } catch (error) {
    error = new Error('INVALID DATA');
    error.statusCode = 400;
    throw error;
  }
};

const getOrderStatusCount = async (userId) => {
  try {
    const [result] = await dataSource.query(
      `SELECT
        COUNT(CASE WHEN os.id=1 THEN 1 ELSE NULL END) PENDING,
        COUNT(CASE WHEN os.id=2 THEN 1 ELSE NULL END) SHIPPING,
        COUNT(CASE WHEN os.id=3 THEN 1 ELSE NULL END) COMPLETE
        FROM order_status os
        JOIN orders o ON o.order_status_id = os.id
        WHERE o.user_id = ?`,
      [userId]
    );
    return result;
  } catch (error) {
    error = new Error('INVALID DATA');
    error.statusCode = 400;
    throw error;
  }
};

const getSubscribeBooks = async (userId) => {
  try {
    return dataSource.query(
      `SELECT
        b.title,
        b.thumbnail,
        b.price,
        date_format(o.subscribe_delivery_time, '%Y-%m-%d') subscribeDeliveryTime
        FROM books b
        JOIN order_items oi ON oi.book_id = b.id
        JOIN orders o ON o.id = oi.order_id
        JOIN users u ON u.id = o.user_id
        WHERE u.id = ? AND b.is_subscribe = TRUE`,
      [userId]
    );
  } catch (error) {
    error = new Error('INVALID DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  completeOrder,
  completeOrders,
  getOrder,
  getOrderStatus,
  getOrderStatusCount,
  getSubscribeBooks,
  subscribeCycleEnum,
};
