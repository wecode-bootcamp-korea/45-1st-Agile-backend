const { dataSource } = require('./dataSource');

const getBookById = async (bookId) => {
  try {
    return await dataSource.query(
      `
            SELECT 
                title, 
                subtitle, 
                author,
                issue_date,
                description,
                thumbnail, 
                price, 
                is_subscribe
            FROM books
            WHERE books.id = ?
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
  getBookById,
};
