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

describe('Update User Detail Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should return 400 if user id does not exist', async () => {
    const randomId = mongoose.Types.ObjectId().toHexString();

    await agent.patch(`/api/users/update/${randomId}`).set('Cookie', await global.signIn())

    .send({
      firstName: 'joao',
      lastName: 'Rivia',
      email: 'joao@joao.com',
    }).expect(400);
  });

  it('should return 400 if email is invalid', async () => {
    const newUser = await buildUser();

    await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: 'joao',
      lastName: 'Rivia',
      email: 'joaojoao.com',
    }).expect(400);
  });

  it('should return 400 if email is blank', async () => {
    const newUser = await buildUser();

    await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: 'Joao',
      lastName: 'Rivia',
      email: '',
    }).expect(400);
  });

  it('should return 400 if firstName is blank', async () => {
    const newUser = await buildUser();

    await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: '',
      lastName: 'Rivia',
      email: 'joao@joao.com',
    }).expect(400);
  });

  it('should return 400 if lastName is blank', async () => {
    const newUser = await buildUser();

    await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: 'Joao',
      lastName: '',
      email: 'joao@joao.com',
    }).expect(400);
  });

  it('should update the last name of the user', async () => {
    const newUser = await buildUser();

    const response = await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: 'joao',
      lastName: 'Rivia',
      email: 'joao@joao.com',
    }).expect(201);

    expect(response.body.lastName).toEqual('Rivia');
  });

  it('should update the firstName of the user', async () => {
    const newUser = await buildUser();

    const response = await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: 'Geralt',
      lastName: 'sousa',
      email: 'joao@joao.com',
    }).expect(201);

    expect(response.body.firstName).toEqual('Geralt');
  });

  it('should update the email of the user', async () => {
    const newUser = await buildUser();

    const response = await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: 'joao',
      lastName: 'sousa',
      email: 'joao@thewitcher.com',
    }).expect(201);

    expect(response.body.email).toEqual('joao@thewitcher.com');
  });

  it('should update the user data', async () => {
    const newUser = await buildUser();

    const response = await agent.patch(`/api/users/update/${newUser.id}`).set('Cookie', global.signInWithUser(
      newUser.id,
    ))
    .send({
      firstName: 'Geralt',
      lastName: 'Rivia',
      email: 'joao@thewitcher.com',
    }).expect(201);

    expect(response.body.lastName).toEqual('Rivia');
  });
});
