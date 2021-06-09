import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const getThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  const threadExists = await Thread.findById(threadId).populate('post');

  res.send(threadExists);
};
