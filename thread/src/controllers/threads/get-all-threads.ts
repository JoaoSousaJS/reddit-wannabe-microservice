import { Request, Response } from 'express';

export const getAllThreads = (req: Request, res: Response) => {
  res.send({ true: 'true' });
};
