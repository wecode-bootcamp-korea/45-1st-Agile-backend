const likeDao = require('../models/likeDao');

const createDeleteLike = async (userId, bookId) => {
  try {
    let createOrDelete;
    const isLiked = await likeDao.getLike(userId, bookId);

    if (isLiked) {
      createOrDelete = 'Deleted Like';
      await likeDao.deleteLike(userId, bookId);

      return createOrDelete;
    }

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
