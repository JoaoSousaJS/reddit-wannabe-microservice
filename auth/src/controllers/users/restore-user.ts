import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import { User } from '../../database/models/user';

export const restoreUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const userExist = await User.findById(userId);

  if (!userExist) {
    throw new BadRequesterror('User does not exist');
  }
  res.send({ true: 'true' });
};
