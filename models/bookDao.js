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

const getBookList = async (categoryId, subCategoryId) => {
  try {
    const baseQuery = `SELECT DISTINCT books.title, books.subtitle, books.thumbnail, books.price
      FROM books 
      JOIN sub_categories ON books.sub_category_id = sub_categories.id 
      JOIN categories ON categories.id = sub_categories.category_id`;
    const whereConidtion = getFiltering(categoryId, subCategoryId);
    const result = await dataSource.query(baseQuery + '\n' + whereConidtion);
    return result;
  } catch (error) {
    console.log(error);
    error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

var getFiltering = (categoryId, subCategoryId) => {
  const conditionArr = [];
  var whereConidtion = '';

  if (categoryId) conditionArr.push(`categories.id = ${categoryId}`);
  if (subCategoryId)
    conditionArr.push(`books.sub_category_id = ${subCategoryId}`);
  if (!!conditionArr.length) {
    whereConidtion = 'WHERE' + ' ' + conditionArr.join(' AND ');
    return whereConidtion;
  }
};
module.exports = {
  createBookList,
  getBookList,
};
