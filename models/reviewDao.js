const { dataSource } = require('./dataSource');

const getReviewsByBookId = async (bookId, limit, offset) => {
  try {
    return await dataSource.query(
      `
        SELECT 
            content, 
            score,
            created_at createdAt,
            user_id userId,
            ( SELECT COUNT(*) 
              FROM reviews
              WHERE book_id = ? ) countReviews
        FROM reviews
        WHERE book_id = ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
        `,
      [bookId, bookId, limit, offset]
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

module.exports = {
  getReviewsByBookId,
  getReviewsCountByBookId,
  isExistedReview,
};
