import { currentUser, requireAuth, validateRequest } from '@reddit-wannabe/common';
import express from 'express';
import { body } from 'express-validator';
import { getAllPosts } from '../controllers/get-all-posts';
import { getPost } from '../controllers/get-post';
import { newPost } from '../controllers/new-post';
import { updatePost } from '../controllers/update-post';
import {
 checkIfPostExists, checkPost, checkThread,
} from '../middlewares';

export const postRouter = express.Router();

postRouter.get('/api/threads/:threadId/posts/:postId', checkThread, checkIfPostExists, getPost);
postRouter.patch('/api/threads/:threadId/posts/:postId', requireAuth, [
  body('title').notEmpty().withMessage('Title required'),
], validateRequest, currentUser, checkThread, checkPost, updatePost);

postRouter.post('/api/threads/:threadId/posts', requireAuth, [
  body('title').notEmpty().withMessage('Title required'),
], validateRequest, currentUser, checkPost, checkThread, newPost);

postRouter.get('/api/threads/:threadId/posts', checkThread, getAllPosts);
