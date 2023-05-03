const bookService = require('../services/bookService');

const createBookList = async (req, res) => {
  try {
    const {
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
    } = req.body;

    await bookService.createBookList(
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
    );
    return res.status(201).json({ message: 'bookCreated' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getFiltering = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.query;
    const result = await bookService.getFiltering(categoryId, subCategoryId);
    return res
      .status(200)
      .json({ message: 'subcategoryGetSuccess', data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createBookList,
  getFiltering,
};
