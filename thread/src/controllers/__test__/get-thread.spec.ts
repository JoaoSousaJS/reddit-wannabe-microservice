import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Thread } from '../../database/model/thread';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('Get specific Thread', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads/:threadId for threads requests', async () => {
    const response = await agent.get('/api/threads/:threadId').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should return 400 if the thread does not exist', async () => {
    await agent.get('/api/threads/:threadId').expect(400);
  });

  it('Should return the thread details without posts', async () => {
    const randomUserId = mongoose.Types.ObjectId().toHexString();
    const newThread = Thread.build({
      title: 'games',
      userId: randomUserId,
    });

    await newThread.save();

    const response = await agent.get(`/api/threads/${newThread.id}`).expect(200);

    expect(response.body.title).toEqual('games');
  });
});
