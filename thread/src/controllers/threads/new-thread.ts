import { Request, Response } from 'express';

export const newThread = async (req:Request, res: Response) => {
  res.status(201).send({ true: 'true' });
};
