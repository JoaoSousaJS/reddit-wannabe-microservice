import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { Thread } from '../../database/model/thread';

export const newThread = async (req:Request, res: Response) => {
  const userId = req.currentUser.id;
  const { title } = req.body;

  const threadExists = await Thread.findOne({
    title,
  });

  if (threadExists) {
    throw new BadRequesterror('This thread already exists');
  }

  const thread = Thread.build({
    title,
    userId,
  });

  await thread.save();
  res.status(201).send(thread);
};
