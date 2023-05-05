const paymentService = require('../services/paymentService');
const { catchAsync } = require('../middlewares/error');

const createOrder = catchAsync(async (req, res) => {
  const quantity = req.body.quantity;
  const bookId = req.body.bookId;
  const userId = req.user.userId;

  return res.status(201).json({ message: 'CREATE SUCCESS' });
});

module.exports = {
  createOrder,
};
