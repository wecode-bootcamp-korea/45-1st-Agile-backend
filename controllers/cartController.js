const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

const modifyAmount = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;
  const { amount } = req.query;
  const modifyAmount = await cartService.modifyAmount(userId, bookId, amount);
  if (!modifyAmount)
    return res.status(400).json({ message: 'Failed, ease check the data!' });
  const result = await cartService.modifyResultAmount(userId, bookId);
  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

module.exports = {
  modifyAmount,
};
