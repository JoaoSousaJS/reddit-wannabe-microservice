import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const updateThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;
  const { title, postId } = req.body;

  const threadExists = await Thread.findById(threadId);

  if (!threadExists) {
    throw new BadRequesterror('This thread does not exist');
  }

  threadExists.set({
    title,
    post: postId,
  });

  await threadExists.save();
  res.status(204).send(threadExists);
};
