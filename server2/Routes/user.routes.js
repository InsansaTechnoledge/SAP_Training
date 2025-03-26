import express from 'express';
import { checkPassword } from '../Middleware/checkPass.middleware.js';
import { changePassword } from '../Controllers/user.controller.js';

const router = express.Router();

router.post('/change-password' , checkPassword , changePassword)






export default router;