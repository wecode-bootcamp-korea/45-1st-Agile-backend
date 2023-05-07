const { dataSource } = require('./dataSource');

const createCart = async (userId, bookId, amount, isSubscribe) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO carts (
            user_id,
            book_id,
            amount,
            is_subscribe
        ) VALUES (
          ?, ?, ?, ?
        )
      `,
      [userId, bookId, amount, isSubscribe]
    );
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const checkCart = async (userId, bookId) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
          SELECT
          id
          FROM carts 
          WHERE user_id = ? AND book_id = ?
      ) isLiked
      `,
      [userId, bookId]
    );
    return !!parseInt(result.isLiked);
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

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

const deleteBooks = async (userId, bookId) => {
  try {
    const result = await dataSource.query(
      `DELETE
      FROM carts
      WHERE user_id = ? AND book_id = ?;
    `,
      [userId, bookId]
    );

    if (!result.affectedRows) return result.affectedRows;
    return result;
  } catch (error) {
    error = new Error('INVALID_DATA');
  }
};

module.exports = {
  createCart,
  checkCart,
  getCarts,
  modifyQuantity,
  modifyQuantityResult,
  deleteBook,
  deleteBooks,
};
