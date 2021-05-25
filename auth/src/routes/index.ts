import express from 'express';
import { signUp } from '../controllers/users';

export const authRouter = express.Router();

authRouter.post('/', signUp);
