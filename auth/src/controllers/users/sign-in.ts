import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { User } from '../../database/models/user';
import { Password } from '../../database/service/password';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    throw new BadRequesterror('Invalid credentials');
  }

  const hashedPassword = await Password.compare(existingUser.password, password);

  if (!hashedPassword) {
    throw new BadRequesterror('Invalid credentials');
  }
  res.status(201).send({ status: true });
};
