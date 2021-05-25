import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
  res.status(2001).send({ status: true });
};
