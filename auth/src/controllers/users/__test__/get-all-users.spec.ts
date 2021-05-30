import request from 'supertest';
import { app } from '../../../app';
import { User } from '../../../database/models/user';
import { clear, close, connect } from '../../../test/setup';

const agent = request.agent(app);

const buildUser = async () => {
  const userOne = User.build({
    firstName: 'joao',
    lastName: 'sousa',
    email: 'joao@joao.com',
    password: 'asdfasdfasd',
  });

  const userTwo = User.build({
    firstName: 'joao',
    lastName: 'sousa',
    email: 'joao2@joao.com',
    password: 'asdfasdfasd',
  });

  await userOne.save();
  await userTwo.save();

  return [userOne, userTwo];
};

describe('Get All Users Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should return all users', async () => {
    const users = await User.find({});
    expect(users).toHaveLength(0);
    await buildUser();

    const response = await agent.get('/api/users/all').set('Cookie', await global.signIn())
    .send().expect(200);

    expect(users).toHaveLength(2);
    expect(response.body).toHaveLength(2);
  });
});
