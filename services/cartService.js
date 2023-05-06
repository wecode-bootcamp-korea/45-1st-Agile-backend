const cartDao = require('../models/cartDao');

const deleteBooks = async (userId, bookId) => {
  for (let i = 0; i < bookId.length; i++) {
    console.log(bookId[i]);
    const deleteBooks = await cartDao.deleteBooks(userId, bookId[i]);
  }
  return deleteBooks;
};

module.exports = {
  deleteBooks,
};
