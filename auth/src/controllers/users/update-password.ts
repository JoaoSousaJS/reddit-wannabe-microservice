import { Request, Response } from 'express';

export const updatePassword = async (req: Request, res: Response) => {
  res.status(201).send({ true: 'true' });
};
