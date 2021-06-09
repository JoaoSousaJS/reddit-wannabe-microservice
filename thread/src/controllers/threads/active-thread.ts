import { BadRequesterror, UnauthorizedError } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';
import { ThreadStatus } from '../../database/types/thread-status';

export const activeThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;
  const { id } = req.currentUser;

  const threadExists = await Thread.findById(threadId);

  if (!threadExists) {
    throw new BadRequesterror('Thread does no exist');
  }

  if (id !== threadExists.userId) {
    throw new UnauthorizedError('Unauthorized');
  }

  threadExists.set({
    status: ThreadStatus.Active,
  });

  await threadExists.save();
  res.status(204).send(threadExists);
};
