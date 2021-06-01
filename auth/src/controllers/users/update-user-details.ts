import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { User } from '../../database/models/user';

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userExists = await User.findById(userId);
  const { firstName, lastName, email } = req.body;

  if (!userExists) {
    throw new BadRequesterror('User does not exist');
  }

  userExists.set({
    firstName,
    lastName,
    email,
  });

  await userExists.save();
  res.status(201).send(userExists);
};
