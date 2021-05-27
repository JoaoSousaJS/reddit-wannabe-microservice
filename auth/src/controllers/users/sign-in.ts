import { Request, Response } from 'express';

export const signIn = (req: Request, res: Response) => {
  res.status(201).send({ status: true });
};
