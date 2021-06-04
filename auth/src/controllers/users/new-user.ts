import { BadRequesterror } from '@reddit-wannabe/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../database/models/user';

export const signUp = async (req: Request, res: Response) => {
  const {
 password, confirmPassword, firstName, lastName, email,
} = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new BadRequesterror('Email already exists');
  }

  if (password !== confirmPassword) {
    throw new BadRequesterror('Password and Password confirmation must be equal');
  }

  const user = User.build({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  const userJwt = jwt.sign({
    id: user.id,
    email: user.email,
  }, process.env.JWT_KEY);

  req.session = {
    jwt: userJwt,
  };

  res.status(201).send({
    user,
    jwt: userJwt,
  });
};
