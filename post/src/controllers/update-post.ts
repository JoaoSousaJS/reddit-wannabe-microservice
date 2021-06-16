import { Request, Response } from 'express';

export const updatePost = async (req: Request, res: Response) => {
  res.status(204).send({ true: 'true' });
};
