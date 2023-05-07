const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

const deleteBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.query;
  const result = await cartService.deleteBooks(userId, cartId);

  if (!result) return res.status(400).json({ message: 'DELETE FAIL' });
  res.status(200).json({ message: 'DELETE SUCCESS' });
});

module.exports = {
  deleteBooks,
};
