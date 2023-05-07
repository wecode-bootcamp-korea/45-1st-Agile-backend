const likeService = require('../services/likeService');
const { catchAsync } = require('../middlewares/error.js');

const createDeleteLike = catchAsync(async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  if (!bookId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const result = await likeService.createDeleteLike(userId, bookId);

  if (result) {
    return res.status(201).json({ message: result });
  }

  return res.status(400).json({ message: result });
});

const deleteLists = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { likeId } = req.query;
  const result = await likeService.deleteLists(userId, likeId);

  if (!result) return res.status(400).json({ message: 'DELETE FAIL' });

  return res.status(200).json({ message: 'DELETE SUCCESS' });
});

module.exports = {
  createDeleteLike,
  deleteLists,
};
