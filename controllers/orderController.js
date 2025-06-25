import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/Order.js';

 
// @desc    Create a order
// @route   POST /api/v1/orders
export const createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      data: order
    });
});
 