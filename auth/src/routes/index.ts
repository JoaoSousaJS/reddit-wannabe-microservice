import { currentUser, requireAuth, validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body } from 'express-validator';
import {
  deleteUser,
  getAllUsers,
 getCurrentUser, getUserDetails, restoreUser, signIn, signOut, signUp, updatePassword, updateUser,
} from '../controllers/users';

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

authRouter.get('/api/users/me', currentUser, getCurrentUser);
authRouter.post('/api/users/signout', signOut);
authRouter.patch('/api/users/update-password', requireAuth, [
  body('newPassword').trim().isLength({
    min: 6,
    max: 20,
  }).withMessage('Password is required and must have at least 6 characters'),
  body('confirmNewPassword').trim().isLength({
    min: 6,
    max: 20,
  }).withMessage('Password is required and must have at least 6 characters'),
], currentUser, validateRequest, updatePassword);

authRouter.get('/api/users/detail/:userId', requireAuth, currentUser, getUserDetails);
authRouter.get('/api/users/all', requireAuth, currentUser, getAllUsers);
authRouter.patch('/api/users/delete/:userId', requireAuth, currentUser, deleteUser);
authRouter.patch('/api/users/restore/:userId', requireAuth, currentUser, restoreUser);
authRouter.patch('/api/users/update/:userId', requireAuth, [
  body('email').isEmail().withMessage('Invalid Email'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
], currentUser, validateRequest, updateUser);
