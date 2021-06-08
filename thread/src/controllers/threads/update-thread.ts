import { BadRequesterror, UnauthorizedError } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const updateThread = async (req: Request, res: Response) => {
  const { id } = req.currentUser;
  const { threadId } = req.params;
  const { title, postId } = req.body;

  const threadExists = await Thread.findById(threadId);

  if (!threadExists) {
    throw new BadRequesterror('This thread does not exist');
  }

  if (id !== threadExists.userId) {
    throw new UnauthorizedError("You can't edit this thread");
  }

  threadExists.set({
    title,
    post: postId,
  });

  await threadExists.save();
  res.status(204).send(threadExists);
};
