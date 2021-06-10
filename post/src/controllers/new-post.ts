import { Request, Response } from 'express';

export const newPost = async (req: Request, res: Response) => {
  res.send({ true: 'true' });
};
