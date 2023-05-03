const dataSource = require('./dataSource');

const createBookList = async (
  title,
  subtitle,
  author,
  issueDate,
  description,
  thumbnail,
  price,
  quantity,
  subCategoryId,
  isSubscribe
) => {
  try {
    return await dataSource.query(
      `INSERT INTO books (
        title,
        subtitle,
        author,
        issue_date,
        description,
        thumbnail,
        price,
        quantity,
        sub_category_id,
        is_subscribe
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
      [
        title,
        subtitle,
        author,
        issueDate,
        description,
        thumbnail,
        price,
        quantity,
        subCategoryId,
        isSubscribe,
      ]
    );
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getFiltering = async (categoryId, subCategoryId) => {
  try {
    if (!subCategoryId) {
      return dataSource.query(
        `SELECT DISTINCT
        books.title,
        books.subtitle,
        books.thumbnail,
        books.price,
        sub_categories.category_id,
        books.sub_category_id
      FROM books, sub_categories
      JOIN categories ON categories.id = sub_categories.category_id
      WHERE categories.id = ? AND books.sub_category_id = ?;`,
        [categoryId, subCategoryId]
      );
    }
    const result = await dataSource.query(
      `SELECT DISTINCT
        books.title,
        books.subtitle,
        books.thumbnail,
        books.price,
        sub_categories.category_id,
        books.sub_category_id
      FROM books, sub_categories
      JOIN categories ON categories.id = sub_categories.category_id
      WHERE categories.id = ? AND books.sub_category_id = ?;`,
      [categoryId, subCategoryId]
    );
    return result;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createBookList,
  getFiltering,
};
