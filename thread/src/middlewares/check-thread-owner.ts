import { UnauthorizedError } from '@reddit-wannabe/common';
import { NextFunction, Request, Response } from 'express';
import { Thread } from '../database/model/thread';

export const checkThreadOwner = async (req: Request, res: Response, next: NextFunction) => {
  const { threadId } = req.params;

  const threadExists = await Thread.findById(threadId);

  if (!threadExists) {
    throw new UnauthorizedError("You can't do this action");
  }

  next();
};
