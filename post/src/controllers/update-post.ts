import { UnauthorizedError } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Post } from '../database/model/post';

export const updatePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { id } = req.currentUser;

  const post = await Post.findById(postId);

  if (post.userId !== id) {
    throw new UnauthorizedError("You can't access this post");
  }
  res.status(204).send({ true: 'true' });
};
