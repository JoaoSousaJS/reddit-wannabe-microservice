import { requireAuth, validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body } from 'express-validator';
import { newThread } from '../controllers/threads/new-thread';

export const threadRouter = express.Router();

threadRouter.post('/api/threads', requireAuth, [
  body('title').notEmpty().withMessage('Title is required'),
], validateRequest, newThread);
