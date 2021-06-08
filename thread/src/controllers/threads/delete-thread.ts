import { Request, Response } from 'express';

export const deleteThread = (req:Request, res: Response) => {
  res.send({ true: 'true' });
};
