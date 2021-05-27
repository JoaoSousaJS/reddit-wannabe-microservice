import { validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body } from 'express-validator';
import { signIn, signUp } from '../controllers/users';

export const authRouter = express.Router();

authRouter.post('/api/users/signup', [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().isLength({
    min: 6,
    max: 20,
  })
    .withMessage('Password is required and must have at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name required'),
    body('lastName').notEmpty().withMessage('First name required'),
], validateRequest, signUp);

authRouter.post('/api/users/signin', [
  body('email').isEmail().withMessage('Invalid Email'),
], validateRequest, signIn);
