import { Request, Response } from 'express';

export const updateThread = async (req: Request, res: Response) => {
  res.status(201).send({ true: 'true' });
};
