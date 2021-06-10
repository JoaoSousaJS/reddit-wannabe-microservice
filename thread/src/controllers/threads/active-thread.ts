import { ThreadStatus } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const activeThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  const threadExists = await Thread.findById(threadId);

  threadExists.set({
    status: ThreadStatus.Active,
  });

  await threadExists.save();
  res.status(204).send(threadExists);
};
