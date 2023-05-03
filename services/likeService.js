const likeDao = require('../models/likeDao');

const createDeleteLike = async (userId, bookId) => {
  let createOrDelete;
  const isLiked = await likeDao.getLike(userId, bookId);
  if (isLiked) {
    try {
      createOrDelete = 'Deleted Like';
      await likeDao.deleteLike(userId, bookId);
    } catch (error) {
      error = new Error(err.message);
      error.statusCode = 400;
      throw error;
    }
    return createOrDelete;
  }
  try {
    createOrDelete = 'Created Like';
    await likeDao.createLike(userId, bookId);
  } catch (error) {
    error = new Error(error.message);
    error.statusCode = 400;
    throw error;
  }

  return createOrDelete;
};

module.exports = {
  createDeleteLike,
};
