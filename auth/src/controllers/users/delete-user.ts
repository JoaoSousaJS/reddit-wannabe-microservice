import { BadRequesterror, UnauthorizedError } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { User } from '../../database/models/user';

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id } = req.currentUser;

  const user = await User.findById(userId);

  if (userId === id) {
    throw new UnauthorizedError("You can't do that");
  }

  if (!user) {
    throw new BadRequesterror('User does not exist');
  }

  res.send({ true: 'true' });
};
