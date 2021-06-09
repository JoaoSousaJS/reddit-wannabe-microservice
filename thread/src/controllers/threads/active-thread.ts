import { Request, Response } from 'express';

export const activeThread = async (req: Request, res: Response) => {
  res.send({ true: 'true' });
};
