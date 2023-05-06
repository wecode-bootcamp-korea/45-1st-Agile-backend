const cartService = require('../services/cartService');
const { catchAsync } = require('../middlewares/error');

const getCarts = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCarts(userId);
  return res.status(200).json({ message: 'GET SUCCESS', data: result });
});

module.exports = {
  getCarts,
};
