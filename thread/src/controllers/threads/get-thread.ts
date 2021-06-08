import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const getThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  const threadExists = await Thread.findById(threadId).populate('post');

  if (!threadExists) {
    throw new BadRequesterror('This thread does not exist');
  }

  res.send(threadExists);
};
