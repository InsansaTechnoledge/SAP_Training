import express from 'express';
import { getModulesByCourseId } from '../controllers/moduleController.js';
const router = express.Router();

router.get('/',getModulesByCourseId);

export default router;