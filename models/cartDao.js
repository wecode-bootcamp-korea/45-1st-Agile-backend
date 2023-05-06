const { dataSource } = require('./dataSource');

const deleteBooks = async (userId, bookId) => {
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

module.exports = {
  deleteBooks,
};
