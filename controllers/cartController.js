const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

const modifyQuantity = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId, amount } = req.query;
  const result = await cartService.modifyQuantity(userId, cartId, amount);

  if (!result) return res.status(400).json({ message: 'MODIFY FAIL' });

  return res.status(200).json({ message: 'MODIFY SUCCESS', data: result });
});

module.exports = {
  modifyQuantity,
};
