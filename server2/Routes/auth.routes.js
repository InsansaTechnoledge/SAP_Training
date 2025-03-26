import express from 'express';
import { registerUser , loginUser, logoutUser} from '../Controllers/auth.controller.js';
import { authenticateMiddleware } from '../Middleware/passport.middleware.js';

const router = express.Router();

router.post('/register' , registerUser)
router.post('/login-user' ,authenticateMiddleware, loginUser)
router.post('/logout-user' , logoutUser)




export default router;