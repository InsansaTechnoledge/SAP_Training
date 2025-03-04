import express from 'express';
const router = express.Router();
import { getCoursCard } from '../controllers/courseController.js';

router.get('/',getCoursCard);

export default router;