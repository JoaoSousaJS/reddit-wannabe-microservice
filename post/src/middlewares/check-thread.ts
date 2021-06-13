import { BadRequesterror, ThreadStatus } from '@reddit-wannabe/common';
import { NextFunction, Request, Response } from 'express';
import { Thread } from '../database/model/thread';

export const checkThread = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;

  const isThread = await Thread.findById(threadId);

  if (!isThread) {
    throw new BadRequesterror('This thread does not exist');
  }

  if (isThread.status === ThreadStatus.Inactive) {
    throw new BadRequesterror('Inactive thread');
  }

  next();
};
