import { BadRequesterror } from '@reddit-wannabe/common';
import { NextFunction, Request, Response } from 'express';
import { Post } from '../database/model/post';

export const checkIfPostExists = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;

  const postExists = await Post.findById(postId);

  if (!postExists) {
    throw new BadRequesterror('This post does not exists');
  }

  next();
};
