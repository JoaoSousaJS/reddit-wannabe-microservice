import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { User } from '../../database/models/user';

export const signIn = async (req: Request, res: Response) => {
  const { email } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    throw new BadRequesterror('Invalid credentials');
  }
  res.status(201).send({ status: true });
};
