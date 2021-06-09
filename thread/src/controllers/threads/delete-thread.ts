import { BadRequesterror, UnauthorizedError } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const deleteThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;
  const { id } = req.currentUser;

  const threadExists = await Thread.findById(threadId);

  if (!threadExists) {
    throw new BadRequesterror('This thread does not exist');
  }

  if (id !== threadExists.userId) {
    throw new UnauthorizedError('Unauthorized');
  }
  res.send({ true: 'true' });
};
