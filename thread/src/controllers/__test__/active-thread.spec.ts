import request from 'supertest';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';

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
});
