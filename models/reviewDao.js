const { dataSource } = require('./dataSource');

const createReview = async (userId, bookId, content, score) => {
  try {
    const result = await dataSource.query(
      `INSERT INTO reviews (
        user_id,
        book_id,
        content,
        score
        )
      VALUES(
        ?,
        ?,
        ?,
        ?
        )`,
      [userId, bookId, content, score]
    );
    return result;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getReviewsByBookId = async (bookId, limit, offset) => {
  try {
    return await dataSource.query(
      `
        SELECT 
            content, 
            score,
            created_at createdAt,
            user_id userId
        FROM reviews
        WHERE book_id = ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
        `,
      [bookId, limit, offset]
    );
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getReviewsCountByBookId = async (bookId) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT COUNT(*) count
        FROM reviews
        WHERE book_id = ? 
        `,
      [bookId]
    );
    return result;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const isExistedReview = async (bookId) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
            SELECT
            id
            FROM reviews 
            WHERE book_id = ?
        ) reviewExists
        `,
      [bookId]
    );
    return !!parseInt(result.reviewExists);
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const modifyReview = async (userId, reviewId, content, score) => {
  try {
    const result = await dataSource.query(
      `UPDATE reviews
        SET content = ?,
        score = ?
        WHERE user_id = ? AND id = ?`,
      [content, score, userId, reviewId]
    );

    if (!result.affectedRows) return result.affectedRows;

    const [review] = await dataSource.query(
      `SELECT
        content,
        score
      FROM reviews
      WHERE user_id = ? AND id = ?
      `,
      [userId, reviewId]
    );
    return review;
  } catch (error) {
    error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createReview,
  getReviewsByBookId,
  getReviewsCountByBookId,
  isExistedReview,
  modifyReview,
};
