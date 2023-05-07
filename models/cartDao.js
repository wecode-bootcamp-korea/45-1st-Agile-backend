const { dataSource } = require('./dataSource');

const createCart = async (userId, bookId, amount, isSubscribe) => {
  try {
    const result = await dataSource.query(
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
      [result.insertedId]
    );

    return cart;
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

const modifyQuantity = async (userId, cartId, amount) => {
  try {
    const result = await dataSource.query(
      `
        UPDATE carts
        SET amount = ?
        WHERE user_id = ?  AND cart_id =?
      `,
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

const deleteBooks = async (userId, cartId) => {
  try {
    const result = await dataSource.query(
      `DELETE
      FROM carts
      WHERE user_id = ? AND cart_id IN (?);
    `,
      [userId, cartId]
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
  deleteBooks,
};
