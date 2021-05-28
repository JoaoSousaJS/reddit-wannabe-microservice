import { Request, Response } from 'express';
import { User } from '../../database/models/user';

export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.currentUser.id;
  const { newPassword } = req.body;

  const user = await User.findById(userId);

  user.set({
    password: newPassword,
  });

  await user.save();

  res.status(201).send(user);
};
