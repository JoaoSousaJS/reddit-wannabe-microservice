import request from 'supertest';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('Get All Posts', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/posts for posts requests', async () => {
    const response = await agent.get('/api/threads/:theadId/posts').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should return 400 if the thread does not exist', async () => {
    await agent.get('/api/threads/:theadId/posts').send({}).expect(400);
  });
});
