import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';
import { Thread } from '../../database/model/thread';

const agent = request.agent(app);

describe('Active Thread', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads for threads requests', async () => {
    const response = await agent.patch('/api/threads/:threadId/active').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.patch('/api/threads/:threadId/active').send({}).expect(401);
  });

  it('Should return a status other than 401 if the user is signed in', async () => {
    const response = await agent.patch('/api/threads/:threadId/active').set('Cookie', global.signIn()).send({});

    expect(response.status).not.toEqual(401);
  });

  it('Should return 400 if the thread does not exist', async () => {
    await agent.patch('/api/threads/:threadId/active').set('Cookie', global.signIn()).send({}).expect(400);
  });

  it('Should return 401 if the thread does not belong to the current user', async () => {
    const cookie = global.signIn();

    await agent.post('/api/threads').set('Cookie', cookie).send({
      title: 'Game',
    });

    const threads = await Thread.find({});

    await agent.patch(`/api/threads/${threads[0].id}/active`).set('Cookie', global.signIn()).send({}).expect(401);
  });
});
