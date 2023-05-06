const { dataSource } = require('./dataSource');

const getCarts = async (userId) => {
  try {
    return dataSource.query(
      `SELECT DISTINCT
        b.id bookId,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe,
        c.amount
      FROM carts c
      JOIN books b ON b.id = c.book_id
      WHERE c.user_id = ?
        `,
      [userId]
    );
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getCarts,
};
