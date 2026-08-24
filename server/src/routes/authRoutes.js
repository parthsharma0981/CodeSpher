import express from 'express';
import { register, login, logout, forgotPassword, resetPassword, verifyOTP, refreshToken } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', verifyToken, logout);
router.post('/verify-otp', authLimiter, verifyOTP);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.post('/refresh-token', refreshToken);

export default router;
