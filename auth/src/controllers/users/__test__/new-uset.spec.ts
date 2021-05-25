import request from 'supertest';
import { app } from '../../../app';

const agent = request.agent(app);
