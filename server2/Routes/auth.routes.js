import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    googleCallback,
    googleProfile,
    googleAuth,
    checkAuth,
} from '../Controllers/auth.controller.js';
import { authenticateMiddleware } from '../Middleware/passport.middleware.js';
import { authRateLimiter } from '../Middleware/rateLimitChecks/AuthRateLimit.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login-user', authRateLimiter, authenticateMiddleware, loginUser);
router.get('/logout-user', logoutUser);
router.get('/googlelogin-user', googleAuth);
router.get('/callback', googleCallback);
router.get('/profile', googleProfile);
router.get('/check-auth', checkAuth);

export default router;
