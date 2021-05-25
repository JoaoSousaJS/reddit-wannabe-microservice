import { validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body } from 'express-validator';
import { signUp } from '../controllers/users';

export const authRouter = express.Router();

authRouter.post('/api/users/signup', [
  body('email').isEmail().withMessage('Email must be valid'),
], validateRequest, signUp);
