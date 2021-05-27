import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../database/models/user';
import { clear, close, connect } from '../../../test/setup';

const agent = request.agent(app);

describe('New User Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should return 400 if email is blank', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: '',
      password: 'asdfasdfasd',
      confirmPassword: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if firstName is blank', async () => {
    await agent.post('/api/users/signup').send({
      firstName: '',
      lastName: 'sousa',
      email: 'joao@joao.com',
      password: 'asdfasdfasd',
      confirmPassword: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if lastName is blank', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: '',
      email: 'joao@joao.com',
      password: 'asdfasdfasd',
      confirmPassword: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if email is invalid', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development.com',
      password: 'asdfasdfasd',
      confirmPassword: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if password is empty', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: '',
      confirmPassword: 'asdfasdfasd',
    }).expect(400);
  });

  it('should return 400 if password has less than 6 characters', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: 'asdfg',
      confirmPassword: 'asdfg',
    }).expect(400);
  });

  it('should return 400 if confirm password is not equal to password', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: '1234567',
      confirmPassword: '123456',
    }).expect(400);
  });

  it('should return 201 on successful signup', async () => {
    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: '1234567',
      confirmPassword: '1234567',
    }).expect(201);
  });

  it('should save the user on the db', async () => {
    let users = await User.find({});

    expect(users.length).toEqual(0);

    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: '1234567',
      confirmPassword: '1234567',
    }).expect(201);

    users = await User.find({});
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('development@test.com');
  });

  it('should return 400 if email provided already exists', async () => {
    const user = User.build({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: '1234567',
    });

    await user.save();

    await agent.post('/api/users/signup').send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'development@test.com',
      password: '1234567',
      confirmPassword: '1234567',
    }).expect(400);
  });
});
