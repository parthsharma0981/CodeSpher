import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // 10 requests per window
  message: { success: false, error: 'Too many authentication attempts, please try again later' }
});

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100, // 100 requests per window
  message: { success: false, error: 'Too many requests, please try again later' }
});
