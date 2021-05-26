import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler } from '@reddit-wannabe/common';
import { authRouter } from './routes';

export const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: true,
}));

app.use(authRouter);
app.use(errorHandler);
