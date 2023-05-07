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

const deleteLists = async (userId, likeId) => {
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

module.exports = {
  createLike,
  checkLike,
  deleteLike,
  deleteLists,
};
