import { BadRequesterror } from '@reddit-wannabe/common';
import { NextFunction, Request, Response } from 'express';
import { Post } from '../database/model/post';

export const checkPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  const postExists = await Post.findOne({
    title,
  });

  if (postExists) {
    throw new BadRequesterror('This post already exists');
  }

  next();
};
