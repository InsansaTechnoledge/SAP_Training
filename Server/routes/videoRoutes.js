import express from 'express';
import { getVideoById } from '../controllers/videoController.js';
const router = express.Router();

router.get('/video', getVideoById);

export default router;