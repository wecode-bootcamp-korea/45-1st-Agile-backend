const { dataSource } = require('./dataSource');

const createLike = async (userId, bookId) => {
  try {
    return dataSource.query(
      `
          INSERT INTO likes (
            user_id, book_id
          ) VALUES (
            ?, ?
          )
        `,
      [userId, bookId]
    );
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const checkLike = async (userId, bookId) => {
  try {
    const [result] = await dataSource.query(
      `
      SELECT EXISTS (
        SELECT
        id
        FROM likes 
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

const deleteLike = async (userId, bookId) => {
  try {
    return await dataSource.query(
      `
      DELETE FROM likes 
        WHERE user_id= ? AND book_id = ?
        `,
      [userId, bookId]
    );
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const deleteLikes = async (userId, likeId) => {
  try {
    return dataSource.query(
      `DELETE
        FROM likes
        WHERE user_id = ? AND id IN (?)`,
      [userId, likeId]
    );
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const getLikes = async (userId) => {
  try {
    return dataSource.query(
      `SELECT
        l.id,
        b.id bookId,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe isSubscribe
      FROM likes l
      JOIN books b ON l.book_id = b.id
      WHERE l.user_id = ?`,
      [userId]
    );
  } catch (error) {
    error = new Error('CHECK DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createLike,
  checkLike,
  getLikes,
  deleteLike,
  deleteLikes,
};
