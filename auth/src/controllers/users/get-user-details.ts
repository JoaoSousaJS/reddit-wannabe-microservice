import { Request, Response } from 'express';
import { User } from '../../database/models/user';

export const getUserDetails = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  res.status(200).send(user);
};
