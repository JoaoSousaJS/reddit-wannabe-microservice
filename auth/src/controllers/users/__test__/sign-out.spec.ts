import request from 'supertest';
import { app } from '../../../app';
import { clear, close, connect } from '../../../test/setup';

const agent = request.agent(app);

describe('Sign out Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should logout the current user', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: '1234567',
      confirmPassword: '1234567',
    }).expect(201);

    const response = await agent.post('/api/users/signout')
    .send({}).expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
    );
  });
});
