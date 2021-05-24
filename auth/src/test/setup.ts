/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

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
