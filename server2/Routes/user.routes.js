import express from 'express';
import { checkPassword } from '../Middleware/checkPass.middleware.js';
import { changePassword } from '../Controllers/user.controller.js';
import { SensitiveInformationRateLimit } from '../Middleware/rateLimitChecks/SensitiveInfoRateLimit.middleware.js';

const router = express.Router();

router.post(
    '/change-password',
    SensitiveInformationRateLimit,
    checkPassword,
    changePassword
);

export default router;
