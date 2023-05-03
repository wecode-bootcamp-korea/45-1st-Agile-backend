const { dataSource } = require('./dataSource');

const getReviewsByBookId = async (bookId) => {
  try {
    return await dataSource.query(
      `
        SELECT 
            content, 
            score,
            created_at,
            user_id
        FROM reviews
        WHERE book_id = ?
        `,
      [bookId]
    );
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getReviewsByBookId,
};
