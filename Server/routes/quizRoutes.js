import express from 'express';
import { getQuizById } from '../controllers/quizController.js';
const router = express.Router();

router.get('/quiz', getQuizById);

export default router;