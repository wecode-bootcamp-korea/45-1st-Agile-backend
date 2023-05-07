const { dataSource } = require('./dataSource');

const modifyQuantity = async (userId, cartId, amount) => {
  try {
    const result = await dataSource.query(
      `UPDATE carts
      SET amount = ?
      WHERE user_id = ? AND id = ?`,
      [amount, userId, cartId]
    );

    if (!result.affectedRows) return result.affectedRows;

    const [cart] = await dataSource.query(
      `SELECT DISTINCT
        b.id bookId,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe,
        c.amount
      FROM carts c
      JOIN books b ON b.id = c.book_id
      WHERE c.id = ?
        `,
      [cartId]
    );

    return cart;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  modifyQuantity,
};
