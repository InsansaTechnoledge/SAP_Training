import express from 'express';
import { checkAuth, googleAuth, googleCallback, googleProfile, loginUser, logout, registerUser } from '../controllers/authController.js';

const app = express.Router();

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/checkAuth', checkAuth);
app.get('/logout', logout);
app.get('/google', googleAuth);
app.get('/google/callback', googleCallback);
app.get('/profile', googleProfile);

export default app;