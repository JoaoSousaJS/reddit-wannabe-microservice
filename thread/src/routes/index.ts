import express from 'express';
import { newThread } from '../controllers/threads/new-thread';

export const threadRouter = express.Router();

threadRouter.post('/api/threads', newThread);
