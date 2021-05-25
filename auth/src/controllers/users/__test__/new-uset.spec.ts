import request from 'supertest';
import { app } from '../../../app';

const agent = request.agent(app);

describe('New User Controller', () => {
  it('should return 400 if email is blank', async () => {
    await agent.post('/api/users/signup').send({
      email: '',
      password: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if email is invalid', async () => {
    await agent.post('/api/users/signup').send({
      email: 'development.com',
      password: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if password is empty', async () => {
    await agent.post('/api/users/signup').send({
      email: 'development@test.com',
      password: '',
    }).expect(400);
  });

  it('should return 400 if password has less than 6 characters', async () => {
    await agent.post('/api/users/signup').send({
      email: 'development@test.com',
      password: 'asdfg',
    }).expect(400);
  });
});
