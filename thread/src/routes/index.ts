import { requireAuth, validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body, param } from 'express-validator';
import { getAllThreads, getThread, newThread } from '../controllers/threads';

export const threadRouter = express.Router();

threadRouter.get('/api/threads/:threadId', [
  param('threadId').isMongoId().trim(),
], getThread);

threadRouter.post('/api/threads', requireAuth, [
  body('title').notEmpty().withMessage('Title is required'),
], validateRequest, newThread);

threadRouter.get('/api/threads', getAllThreads);
