import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { User } from '../../database/models/user';
import { Password } from '../../database/service/password';

export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.currentUser.id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  const hashedPassword = await Password.compare(user.password, oldPassword);

  if (!hashedPassword) {
    throw new BadRequesterror('Invalid password');
  }

  user.set({
    password: newPassword,
  });

  await user.save();

  res.status(201).send(user);
};
