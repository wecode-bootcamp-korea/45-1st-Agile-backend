const { dataSource } = require('./dataSource');

const modifyAmount = async (userId, bookId, amount) => {
  try {
    const baseQuery = `UPDATE carts`;
    const setQuery = setCondition(amount);
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

const setCondition = (amount) => {
  if (amount == 'plus') return 'SET amount = amount + 1';

  return 'SET amount = amount - 1';
};

const modifyResultAmount = async (userId, bookId) => {
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
  modifyAmount,
  modifyResultAmount,
};
