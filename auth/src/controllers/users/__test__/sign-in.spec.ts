import request from 'supertest';
import { app } from '../../../app';
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

  it('should return 400 if password is invalid', async () => {
    await agent.post('/api/users/signin').send({
      email: 'joao@asdas.com',
      password: 'asd',
    }).expect(400);
  });

  it('should return 400 if email provided does not exist on the db', async () => {
    await agent.post('/api/users/signin').send({
      email: 'joao@asdas.com',
      password: 'asdfg1234',
    }).expect(400);
  });

  it('should return 400 if password provided does not match', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'joao@asdas.com',
      password: 'asdfg1234',
      confirmPassword: 'asdfg1234',
    }).expect(201);

    await agent.post('/api/users/signin').send({
      email: 'joao@asdas.com',
      password: 'asdfg123456',
    }).expect(400);
  });

  it('should return a cookie when credentials are valid', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'joao@asdas.com',
      password: 'asdfg1234',
      confirmPassword: 'asdfg1234',
    }).expect(201);

    const response = await agent.post('/api/users/signin').send({
      email: 'joao@asdas.com',
      password: 'asdfg1234',
    }).expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
