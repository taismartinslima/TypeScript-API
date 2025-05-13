import express, { Router } from 'express';

import { authenticate } from '#middlewares/auth.middleware.js';
import { validateUser } from '#middlewares/validation.middleware.js';
import { register, login, getProfile } from '#controllers/auth.controllers.js';

const router: Router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', validateUser, login);
router.get('/profile', authenticate, getProfile);

export default router;
