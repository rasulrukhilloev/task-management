import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 100, // maksimum 100ta
  message: 'Too many requests from this IP, please try again later'
});
