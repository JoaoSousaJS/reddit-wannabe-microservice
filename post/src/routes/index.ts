import { currentUser, requireAuth } from '@reddit-wannabe/common';
import express from 'express';
import { newPost } from '../controllers/new-post';

export const postRouter = express.Router();

postRouter.post('/api/posts', requireAuth, currentUser, newPost);
