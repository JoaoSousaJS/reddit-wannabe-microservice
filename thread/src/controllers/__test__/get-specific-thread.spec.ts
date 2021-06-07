import request from 'supertest';
import { app } from '../../app';
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
});
