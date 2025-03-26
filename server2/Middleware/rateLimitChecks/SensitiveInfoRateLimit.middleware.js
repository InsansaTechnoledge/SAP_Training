import rateLimit from 'express-rate-limit';
import { APIError } from '../../Utils/ApiError.js';

export const SensitiveInformationRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 attempts per hour
    standardHeaders: true,
    legacyHeaders: false,

    keyGenerator: (req) => {
        return req.user?.id || req.ip; // Prioritize user ID if available, otherwise fallback to IP
    },

    handler: (req, res) => {
        const remainingTime = Math.ceil(req.rateLimit.resetTime / 1000); // in seconds
        return res.json(
            new APIError(
                429,
                `Too many attempts. Try again after ${remainingTime} seconds.`
            )
        );
    },
});
