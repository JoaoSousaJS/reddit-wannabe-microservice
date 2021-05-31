import { BadRequesterror, UnauthorizedError } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { User } from '../../database/models/user';
import { UserStatus } from '../../database/types/user-status';

export const restoreUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id } = req.currentUser;

  const currentUser = await User.findById(id);

  if (currentUser.status === UserStatus.Inactive) {
    throw new UnauthorizedError("You can't do that");
  }

  const userExist = await User.findById(userId);

  if (!userExist) {
    throw new BadRequesterror('User does not exist');
  }

  if (userId === id) {
    throw new UnauthorizedError("You can't do that");
  }

  userExist.set({
    status: UserStatus.Active,
  });

  await userExist.save();
  res.send(userExist);
};
