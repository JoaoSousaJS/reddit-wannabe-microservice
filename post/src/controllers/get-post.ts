import { Request, Response } from 'express';

export const getPost = async (req: Request, res: Response) => {
  const { post } = res.locals;

  res.send(post);
};
