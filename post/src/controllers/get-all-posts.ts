import { Request, Response } from 'express';

export const getAllPosts = async (req: Request, res: Response) => {
  res.send({ true: 'true' });
};
