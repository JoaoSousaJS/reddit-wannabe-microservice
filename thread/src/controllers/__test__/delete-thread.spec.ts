import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';
import { Thread } from '../../database/model/thread';
import { ThreadStatus } from '../../database/types/thread-status';

const agent = request.agent(app);

describe('Delete Thread', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads for threads requests', async () => {
    const response = await agent.patch('/api/threads/:threadId/delete').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.patch('/api/threads/:threadId/delete').send({}).expect(401);
  });

  it('Should return a status other than 401 if the user is signed in', async () => {
    const response = await agent.patch('/api/threads/:threadId/delete').set('Cookie', global.signIn()).send({});

    expect(response.status).not.toEqual(401);
  });

  it('Should return 400 if the thread does not exist', async () => {
    await agent.patch('/api/threads/:threadId/delete').set('Cookie', global.signIn()).expect(400);
  });

  it('Should return 401 if the thread does not belong to the current user', async () => {
    const userId = mongoose.Types.ObjectId().toHexString();
    const thread = Thread.build({
      title: 'game',
      userId,
    });

    await thread.save();

    await agent.patch(`/api/threads/${thread.id}/delete`).set('Cookie', global.signIn()).expect(401);
  });

  it('Should return 400 if thread is already deleted', async () => {
    const cookie = global.signIn();

    await agent.post('/api/threads').set('Cookie', cookie).send({
      title: 'game',
    }).expect(201);

    let thread = await Thread.find({});

    thread[0].set({
      status: ThreadStatus.Inactive,
    });

    await thread[0].save();

    thread = await Thread.find({});

    await agent.patch(`/api/threads/${thread[0].id}/delete`).set('Cookie', cookie).expect(400);
  });

  it('Should delete the thread', async () => {
    const cookie = global.signIn();

    await agent.post('/api/threads').set('Cookie', cookie).send({
      title: 'game',
    }).expect(201);

    let thread = await Thread.find({});

    await agent.patch(`/api/threads/${thread[0].id}/delete`).set('Cookie', cookie).expect(204);

    thread = await Thread.find({});
    expect(thread[0].status).toEqual(ThreadStatus.Inactive);
  });
});
