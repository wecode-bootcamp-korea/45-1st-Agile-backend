const { dataSource } = require('./dataSource');

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
  } catch (error) {
    error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

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

const getBookList = async (
  categoryId,
  subCategoryId,
  orderBy,
  limit,
  offset
) => {
  try {
    const baseQuery = `
      SELECT DISTINCT
        b.id,
        b.title,
        b.subtitle,
        b.thumbnail,
        b.price,
        b.quantity,
        b.created_at createdAt,
        (SELECT COUNT(*) FROM likes l WHERE l.book_id = b.id ) countLikes
      FROM books b
      JOIN sub_categories sc ON b.sub_category_id = sc.id
      JOIN categories c ON c.id = sc.category_id`;
    const whereConidtion = getFiltering(categoryId, subCategoryId);
    const sortQuery = getOrdering(orderBy);
    const limitQuery = getLimit(limit, offset);
    const result = await dataSource.query(
      [baseQuery, whereConidtion, sortQuery, limitQuery].join(' ')
    );
    return result;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const getFiltering = (categoryId, subCategoryId) => {
  const conditionArr = [];
  let whereConidtion = '';

  if (categoryId) conditionArr.push(`c.id = ${categoryId}`);
  if (subCategoryId) conditionArr.push(`b.sub_category_id = ${subCategoryId}`);
  if (!!conditionArr.length) {
    whereConidtion = 'WHERE' + ' ' + conditionArr.join(' AND ');
    return whereConidtion;
  }
  return whereConidtion;
};

const getOrdering = (orderBy) => {
  switch (orderBy) {
    case 'bestBooks':
      return 'ORDER BY best DESC';
    case 'newBooks':
      return 'ORDER BY created_at DESC';
    case 'priceAsc':
      return 'ORDER BY price ASC';
    case 'priceDesc':
      return 'ORDER BY price DESC';
    default:
      return 'ORDER BY id DESC';
  }
};

const getLimit = (limit, offset) => {
  return `LIMIT ${limit} OFFSET ${offset}`;
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

const deleteReview = async (userId, reviewId) => {
  try {
    const result = await dataSource.query(
      `DELETE
      FROM reviews
      WHERE user_id = ? AND id = ?`,
      [userId, reviewId]
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
  createBookList,
  getBookById,
  getBookList,
  isExistedBook,
  deleteReview,
};
