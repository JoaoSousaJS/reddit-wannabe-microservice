import { currentUser, requireAuth, validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body } from 'express-validator';
import { newPost } from '../controllers/new-post';

export const postRouter = express.Router();

postRouter.post('/api/threads/:threadId/posts', requireAuth, [
  body('title').notEmpty().withMessage('Title required'),
], validateRequest, currentUser, newPost);
