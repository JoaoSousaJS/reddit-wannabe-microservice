/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signIn(): Promise<string>
      signInWithUser(id: string): string[]
    }
  }
}

const mongoServer = new MongoMemoryServer();

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connect = async () => {
  await mongoose.disconnect();
  process.env.JWT_KEY = 'asdf';
  await mongoServer.start();

  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

export const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const clear = async () => {
  const { collections } = mongoose.connection;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

global.signIn = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const firstName = 'joao';
  const lastName = 'sousa';

  const response = await request(app).post('/api/users/signup').send({
    email,
    password,
    firstName,
    lastName,
    confirmPassword: password,
  });

  const cookie = response.get('Set-Cookie')[0];

  return cookie;
};

global.signInWithUser = (id: string): string[] => {
  const payload = {
    id: id || mongoose.Types.ObjectId().toHexString,
    email: 'test@test.com',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY);

  const session = {
    jwt: token,
  };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
};
