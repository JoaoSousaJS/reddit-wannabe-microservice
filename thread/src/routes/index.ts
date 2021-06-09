import { currentUser, requireAuth, validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body, param } from 'express-validator';
import {
  activeThread,
  deleteThread,
 getAllThreads, getThread, newThread, updateThread,
} from '../controllers/threads';
import { checkThreadOwner } from '../middlewares';

export const threadRouter = express.Router();

threadRouter.get('/api/threads/:threadId', [
  param('threadId').isMongoId().trim(),
], getThread);

threadRouter.patch('/api/threads/:threadId', requireAuth, [
  body('title').notEmpty().withMessage('Title is required'),
], validateRequest, currentUser, checkThreadOwner, updateThread);

threadRouter.patch('/api/threads/:threadId/delete', requireAuth, currentUser, checkThreadOwner, deleteThread);
threadRouter.patch('/api/threads/:threadId/active', requireAuth, currentUser, checkThreadOwner, activeThread);

threadRouter.post('/api/threads', requireAuth, [
  body('title').notEmpty().withMessage('Title is required'),
], validateRequest, newThread);

threadRouter.get('/api/threads', getAllThreads);
