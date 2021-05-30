import { UnauthorizedError } from '@reddit-wannabe/common';
import { Request, Response } from 'express';

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id } = req.currentUser;

  if (userId === id) {
    throw new UnauthorizedError("You can't do that");
  }

  res.send({ true: 'true' });
};
