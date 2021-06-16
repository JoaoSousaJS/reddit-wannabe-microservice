import { Request, Response } from 'express';

export const getPost = async (req: Request, res: Response) => {
  res.send({ true: 'true' });
};
