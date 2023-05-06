const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

const deleteBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.query;
  const result = await cartService.deleteBooks(userId, bookId);
  if (!result)
    return res.status(400).json({ message: 'Failed, ease check the data!' });
  return res.status(200).json({ message: 'DELETE SUCCESS' });
});

module.exports = {
  deleteBooks,
};
