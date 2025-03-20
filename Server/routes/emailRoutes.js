import express from 'express';
const router=express.Router();

import { sendPaymentMail } from "../controllers/emailController.js";

router.post('/paymentMail',sendPaymentMail);

export default router;