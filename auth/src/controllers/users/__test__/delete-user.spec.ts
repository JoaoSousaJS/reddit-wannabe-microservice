import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../app';
import { User } from '../../../database/models/user';
import { clear, close, connect } from '../../../test/setup';
import { UserStatus } from '../../../database/types/user-status';

const agent = request.agent(app);

const buildUser = async () => {
  const user = User.build({
    firstName: 'joao',
    lastName: 'sousa',
    email: 'joao@joao.com',
    password: 'asdfasdfasd',
  });

  await user.save();

  return user;
};

describe('Get User Detail Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should deactivate an user', async () => {
    const newUser = await buildUser();

    await agent.patch(`/api/users/delete/${newUser.id}`).set('Cookie', await global.signIn())
    .send().expect(200);

    const user = await User.findById(newUser.id);

    expect(user.status).toEqual(UserStatus.Inactive);
  });

  it('should 400 if user does not exist', async () => {
    const randomId = mongoose.Types.ObjectId().toHexString();
    await agent.patch(`/api/users/delete/${randomId}`).set('Cookie', await global.signIn())
    .send().expect(400);
  });

  it('should 400 if user being deactivated is the current user', async () => {
    const randomId = mongoose.Types.ObjectId().toHexString();
    await agent.patch(`/api/users/delete/${randomId}`).set('Cookie', await global.signIn())
    .send().expect(400);
  });
});
