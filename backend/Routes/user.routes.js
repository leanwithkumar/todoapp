import express from 'express';
import { logOUT, registerUser, signIn } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', signIn);
router.get('/logout', logOUT);

export default router;
