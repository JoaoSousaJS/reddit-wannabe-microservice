import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Thread } from '../../database/model/thread';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('New Thread', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads for threads requests', async () => {
    const response = await agent.post('/api/threads').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.post('/api/threads').send({}).expect(401);
  });

  it('Should return a status other than 401 if the user is signed in', async () => {
    const response = await agent.post('/api/threads').set('Cookie', global.signIn()).send({});

    expect(response.status).not.toEqual(401);
  });

  it('Should return 400 if title is blank ', async () => {
    await agent.post('/api/threads').set('Cookie', global.signIn()).send({
      title: '',
    }).expect(400);
  });

  it('Should create a thread with valid inputs', async () => {
    let threads = await Thread.find({});
    const userId = mongoose.Types.ObjectId().toHexString();
    expect(threads.length).toEqual(0);

    await agent.post('/api/threads').set('Cookie', global.signIn()).send({
      title: 'Games',
      userId,
    }).expect(201);

    threads = await Thread.find({});

    expect(threads.length).toEqual(1);

    expect(threads[0].title).toEqual('Games');
  });
});
