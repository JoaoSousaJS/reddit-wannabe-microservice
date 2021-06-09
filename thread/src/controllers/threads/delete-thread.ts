import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';
import { ThreadStatus } from '../../database/types/thread-status';

export const deleteThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  const threadExists = await Thread.findById(threadId);

  if (threadExists.status === ThreadStatus.Inactive) {
    throw new BadRequesterror('This thread is inactive');
  }

  threadExists.set({
    status: ThreadStatus.Inactive,
  });

  await threadExists.save();

  res.status(204).send(threadExists);
};
