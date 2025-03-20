import express from 'express';
import { checkAuth, googleAuth, googleCallback, googleProfile, loginUser, logout, registerUser } from '../controllers/authController.js';

const  router= express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/checkAuth', checkAuth);
router.get('/logout', logout);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/profile', googleProfile);

export default router;