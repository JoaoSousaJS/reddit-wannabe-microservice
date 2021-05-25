import { validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body } from 'express-validator';
import { signUp } from '../controllers/users';

export const authRouter = express.Router();

authRouter.post('/api/users/signup', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().isLength({
    min: 6,
    max: 20,
  })
    .withMessage('Password is required and must have at least 6 characters'),
], validateRequest, signUp);
