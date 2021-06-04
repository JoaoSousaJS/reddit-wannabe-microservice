import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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

  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email,
  }, process.env.JWT_KEY);

  req.session = {
    jwt: userJwt,
  };

  res.status(200).send({
    user: existingUser,
    jwt: userJwt,
  });
};
