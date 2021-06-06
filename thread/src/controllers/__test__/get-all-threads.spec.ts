import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Thread } from '../../database/model/thread';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('Get All Thread', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads for threads requests', async () => {
    const response = await agent.get('/api/threads').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should list all created threads', async () => {
    let threads = await Thread.find({});
    const userId = mongoose.Types.ObjectId().toHexString();
    expect(threads.length).toEqual(0);

    await agent.post('/api/threads').set('Cookie', global.signIn()).send({
      title: 'Games',
      userId,
    }).expect(201);

    await agent.post('/api/threads').set('Cookie', global.signIn()).send({
      title: 'Games 2',
      userId,
    }).expect(201);

    threads = await Thread.find({});

    expect(threads.length).toEqual(2);

    expect(threads[0].title).toEqual('Games');
    expect(threads[1].title).toEqual('Games 2');
  });
});
