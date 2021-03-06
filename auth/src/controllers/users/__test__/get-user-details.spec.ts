import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../../app';
import { User } from '../../../database/models/user';
import { clear, close, connect } from '../../../test/setup';

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

  it('should return the details of an user', async () => {
    const newUser = await buildUser();

    const response = await agent.get(`/api/users/detail/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send().expect(200);

    expect(response.body.email).toEqual('joao@joao.com');
    expect(response.body.firstName).toEqual('joao');
    expect(response.body.lastName).toEqual('sousa');
  });

  it('should return 400 if user id does not exist', async () => {
    const newUser = await buildUser();
    const randomMongoId = mongoose.Types.ObjectId().toHexString();

    await agent.get(`/api/users/detail/${randomMongoId}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send().expect(400);
  });
});
