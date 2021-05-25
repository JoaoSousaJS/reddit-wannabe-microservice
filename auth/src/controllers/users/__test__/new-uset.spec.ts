import request from 'supertest';
import { app } from '../../../app';

const agent = request.agent(app);

describe('New User Controller', () => {
  it('should return 400 if email is invalid or blank', async () => {
    await agent.post('/api/users/signup').send({
      email: '',
      password: 'asdfasdfasd',
    }).expect(400);
  });
});
