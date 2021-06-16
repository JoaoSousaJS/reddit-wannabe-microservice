import { BadRequesterror } from '@reddit-wannabe/common';
import { NextFunction, Request, Response } from 'express';
import { Post } from '../database/model/post';

export const checkIfPostExists = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;

  const post = await Post.findById(postId).populate('comments');

  if (!post) {
    throw new BadRequesterror('This post does not exists');
  }

  res.locals.post = post;

  next();
};
