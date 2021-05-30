import { Request, Response } from 'express';
import { User } from '../../database/models/user';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};
