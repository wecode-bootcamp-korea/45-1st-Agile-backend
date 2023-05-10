const orderService = require('../services/orderService');
const { catchAsync } = require('../middlewares/error');

const getOrderStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await orderService.getOrderStatus(userId);
  const resultCount = await orderService.getOrderStatusCount(userId);
  return res
    .status(200)
    .json({
      message: 'ORDER GET SUCCESS',
      data: result,
      orderStatus: resultCount,
    });
});

module.exports = {
  getOrderStatus,
};
