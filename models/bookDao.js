const { dataSource } = require('./dataSource');

const getBookById = async (bookId) => {
  try {
    const [book] = await dataSource.query(
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

    return book;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const isExistedBook = async (bookId) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
          SELECT
          id
          FROM books 
          WHERE id = ?
      ) bookExists
      `,
      [bookId]
    );
    return !!parseInt(result.bookExists);
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getBookById,
  isExistedBook,
};
