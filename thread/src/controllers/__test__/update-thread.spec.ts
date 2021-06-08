import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';
import { Thread } from '../../database/model/thread';

const agent = request.agent(app);

describe('Update Thread', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads for threads requests', async () => {
    const response = await agent.patch('/api/threads/:threadId').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.patch('/api/threads/:threadId').send({}).expect(401);
  });

  it('Should return a status other than 401 if the user is signed in', async () => {
    const response = await agent.patch('/api/threads/:threadId').set('Cookie', global.signIn()).send({});

    expect(response.status).not.toEqual(401);
  });

  it('Should return 400 if the thread does not exist', async () => {
    const randomThreadId = mongoose.Types.ObjectId().toHexString();
    await agent.patch(`/api/threads/${randomThreadId}`).set('Cookie', global.signIn()).send({
      title: 'game',
    }).expect(400);
  });

  it('Should return 401 if the thread does not belong to the current user', async () => {
    const cookie = global.signIn();

    await agent.post('/api/threads').set('Cookie', cookie).send({
      title: 'new games',
    }).expect(201);

    const thread = await Thread.find({});

    await agent.patch(`/api/threads/${thread[0].id}`).set('Cookie', global.signIn()).send({
      title: 'game',
    }).expect(401);
  });

  it('Should return 400 if title is blank or invalid', async () => {
    const cookie = global.signIn();

    await agent.post('/api/threads').set('Cookie', cookie).send({
      title: 'new games',
    }).expect(201);

    const thread = await Thread.find({});

    await agent.patch(`/api/threads/${thread[0].id}`).set('Cookie', cookie).send({
      title: '',
    }).expect(400);
  });

  it('Should update the thread', async () => {
    const cookie = global.signIn();

    await agent.post('/api/threads').set('Cookie', cookie).send({
      title: 'new games',
    }).expect(201);

    let thread = await Thread.find({});

    await agent.patch(`/api/threads/${thread[0].id}`).set('Cookie', cookie).send({
      title: 'games',
    }).expect(204);

    thread = await Thread.find({});

    expect(thread[0].title).toEqual('games');
  });
});
