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

const modifyQuantity = async (userId, bookId, button) => {
  try {
    const baseQuery = `UPDATE carts`;
    const setQuery = setCondition(button);
    const whereQuery = `WHERE user_id =${userId} AND book_id = ${bookId}`;
    const result = await dataSource.query(
      baseQuery + ' ' + setQuery + ' ' + whereQuery
    );
    if (!result.affectedRows) return result.affectedRows;
    return result;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const deleteBook = async (userId, bookId) => {
  try {
    const result = await dataSource.query(
      `DELETE
     FROM carts
     WHERE user_id = ? AND book_id = ?
    `,
      [userId, bookId]
    );
    if (!result.affectedRows) return result.affectedRows;
    return result;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const setCondition = (button) => {
  if (button == 'plus') return 'SET amount = amount + 1';

  return 'SET amount = amount - 1';
};

const modifyQuantityResult = async (userId, bookId) => {
  try {
    return dataSource.query(
      `SELECT DISTINCT
        b.id,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe,
        c.amount
      FROM carts c
      JOIN books b ON b.id = c.book_id
      WHERE c.user_id = ? AND c.book_id = ?
        `,
      [userId, bookId]
    );
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getCarts,
  modifyQuantity,
  modifyQuantityResult,
  deleteBook,
};
