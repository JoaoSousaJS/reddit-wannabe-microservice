import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const newThread = async (req:Request, res: Response) => {
  const userId = req.currentUser.id;
  const { title } = req.body;

  const thread = Thread.build({
    title,
    userId,
  });

  await thread.save();
  res.status(201).send(thread);
};
