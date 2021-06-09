import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const updateThread = async (req: Request, res: Response) => {
  const { threadId } = req.params;
  const { title, postId } = req.body;

  const threadExists = await Thread.findById(threadId);

  threadExists.set({
    title,
    post: postId,
  });

  await threadExists.save();
  res.status(204).send(threadExists);
};
