import express from 'express';
const router = express.Router();
import { getVideoContent ,getQuizContent} from '../controllers/contentController.js';

router.get('/video',getVideoContent);
router.get('/quiz',getQuizContent);

export default router;