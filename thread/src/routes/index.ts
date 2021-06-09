import { currentUser, requireAuth, validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body, param } from 'express-validator';
import {
  activeThread,
  deleteThread,
 getAllThreads, getThread, newThread, updateThread,
} from '../controllers/threads';

export const threadRouter = express.Router();

threadRouter.get('/api/threads/:threadId', [
  param('threadId').isMongoId().trim(),
], getThread);

threadRouter.patch('/api/threads/:threadId', requireAuth, [
  body('title').notEmpty().withMessage('Title is required'),
], validateRequest, currentUser, updateThread);

threadRouter.patch('/api/threads/:threadId/delete', requireAuth, currentUser, deleteThread);
threadRouter.patch('/api/threads/:threadId/active', requireAuth, currentUser, activeThread);

threadRouter.post('/api/threads', requireAuth, [
  body('title').notEmpty().withMessage('Title is required'),
], validateRequest, newThread);

threadRouter.get('/api/threads', getAllThreads);
