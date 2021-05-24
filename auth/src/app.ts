import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

export const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: true,
}));
