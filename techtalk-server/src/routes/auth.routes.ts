import express from 'express';
import { signIn, signUp } from '../controller/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { getMe } from '../controller/user.controller';
const router = express.Router();


router.post('/register', signUp);
router.post('/login', signIn);
router.get('/me', verifyToken, getMe);

export default router;
