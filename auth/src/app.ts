import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@reddit-wannabe/common';
import { authRouter } from './routes';

export const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}));

app.use(authRouter);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);
