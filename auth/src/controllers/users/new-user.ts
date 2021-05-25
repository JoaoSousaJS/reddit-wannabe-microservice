import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequesterror('Password and Password confirmation must be equal');
  }
  res.status(201).send({ status: true });
};
