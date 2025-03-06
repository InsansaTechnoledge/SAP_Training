import express from 'express';
const router = express.Router();
import { getVideoContent } from '../controllers/contentController.js';

router.get('/video',getVideoContent);

export default router;