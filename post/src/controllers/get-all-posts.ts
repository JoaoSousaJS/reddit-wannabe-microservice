import { Request, Response } from 'express';
import { Thread } from '../database/model/thread';

export const getAllPosts = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  const threads = await Thread.findById(threadId).populate('post');
  res.send(threads);
};
