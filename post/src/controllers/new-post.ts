import { Request, Response } from 'express';
import { Post } from '../database/model/post';
import { Thread } from '../database/model/thread';

export const newPost = async (req: Request, res: Response) => {
  const { id } = req.currentUser;
  const { threadId } = req.params;
  const { title } = req.body;

  const thread = await Thread.findById(threadId);
  const post = Post.build({
    title,
    threadId,
    userId: id,
  });

  await post.save();

  thread.post.push(post.id);

  await thread.save();

  res.status(201).send(post);
};
