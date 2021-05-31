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

describe('Restore User Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should restore an user', async () => {
    const newUser = await buildUser();

    await agent.patch(`/api/users/restore/${newUser.id}`).set('Cookie', await global.signIn())
    .send().expect(200);

    const user = await User.findById(newUser.id);

    expect(user.status).toEqual(UserStatus.Active);
  });

  it('should return 400 if user does not exist', async () => {
    const randomId = mongoose.Types.ObjectId().toHexString();
    await agent.patch(`/api/users/restore/${randomId}`).set('Cookie', await global.signIn())
    .send().expect(400);
  });

  it('should return 401 if user being activated is the current user', async () => {
    const newUser = await buildUser();

    await agent.patch(`/api/users/restore/${newUser.id}`).set('Cookie', global.signInWithUser(newUser.id))
    .send().expect(401);
  });
});
