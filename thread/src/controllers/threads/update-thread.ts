import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const updateThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  const threadExists = await Thread.findById(threadId);

  if (!threadExists) {
    throw new BadRequesterror('This thread does not exist');
  }
  res.status(204).send({ true: 'true' });
};
