import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const getAllThreads = async (req: Request, res: Response) => {
  const threads = await Thread.find({}).populate('post');
  res.send(threads);
};
