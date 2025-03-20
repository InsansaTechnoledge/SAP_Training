import express from 'express';
import { createOrder, getPayment, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/createOrder', createOrder);
router.post('/verifyPayment', verifyPayment);
router.post('/getPayment', getPayment);

export default router;