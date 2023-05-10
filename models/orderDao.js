const { dataSource } = require('./dataSource');

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
        o.created_at createdAt
        FROM order_status os
        JOIN orders o ON o.order_status_id = os.id
        JOIN order_items oi ON oi.order_id = o.id
        JOIN books b ON b.id = oi.book_id
        WHERE o.user_id = ?
        GROUP BY o.order_number, os.status, o.created_at`,
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
    return dataSource.query(
      `SELECT
        COUNT(CASE WHEN os.id=1 THEN 1 ELSE NULL END) PreparingForDelivery,
        COUNT(CASE WHEN os.id=2 THEN 1 ELSE NULL END) Shipping,
        COUNT(CASE WHEN os.id=3 THEN 1 ELSE NULL END) DeliveryCompleted
        FROM order_status os
        JOIN orders o ON o.order_status_id = os.id
        WHERE o.user_id = ?`,
      [userId]
    );
  } catch (error) {
    error = new Error('INVALID DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getOrderStatus,
  getOrderStatusCount,
};
