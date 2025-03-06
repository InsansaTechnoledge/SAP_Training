import express from 'express';
const router = express.Router();
import { getCoursCard, getcourseById } from '../controllers/courseController.js';

router.get('/',getCoursCard);
router.get('/course',getcourseById);

export default router;