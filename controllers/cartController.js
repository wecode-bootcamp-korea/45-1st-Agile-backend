const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

const modifyQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, button } = req.body;
  const modifyQuantity = await cartService.modifyQuantity(
    userId,
    bookId,
    button
  );
  if (!modifyQuantity)
    return res.status(400).json({ message: 'Failed, ease check the data!' });
  const result = await cartService.modifyQuantityResult(userId, bookId);
  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

module.exports = {
  modifyQuantity,
};
