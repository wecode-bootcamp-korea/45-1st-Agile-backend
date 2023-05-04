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

module.exports = {
  createCart,
  checkCart,
};
