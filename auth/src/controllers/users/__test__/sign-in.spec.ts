import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../database/models/user';
import { clear, close, connect } from '../../../test/setup';

const agent = request.agent(app);

describe('Sign in Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should return 400 if email is blank', async () => {
    await agent.post('/api/users/signin').send({
      email: '',
      password: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if email is invalid', async () => {
    await agent.post('/api/users/signin').send({
      email: 'joao.com',
      password: 'asdfasdfasd',
    }).expect(400);
  });
});
