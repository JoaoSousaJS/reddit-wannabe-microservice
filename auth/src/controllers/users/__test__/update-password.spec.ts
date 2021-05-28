import request from 'supertest';
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

describe('Update Password Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should return 201 and update user password', async () => {
    const newUser = await buildUser();

    await agent.patch('/api/users/update-password')
    .set('Cookie', global.signInWithUser(newUser.id)).send({
      oldPassword: newUser.password,
      newPassword: '1234567',
      confirmNewPassword: '1234567',
    }).expect(201);
  });
});
