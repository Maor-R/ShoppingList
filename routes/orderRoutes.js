import express from 'express';
import {
  createOrder,
} from '../controllers/orderController.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(createOrder);


export default router;