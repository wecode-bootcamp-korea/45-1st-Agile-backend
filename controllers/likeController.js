const likeService = require('../services/likeService');
const { catchAsync } = require('../middlewares/error.js');

const createDeleteLike = catchAsync(async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const result = await likeService.createDeleteLike(userId, bookId);

  return res.status(201).json({
    message: result,
  });
});

module.exports = {
  createDeleteLike,
};
