import request from 'supertest';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('Update Post', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads/:theadId/posts/:postId for posts requests', async () => {
    const response = await agent.put('/api/threads/:theadId/posts/:postId').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.put('/api/threads/:theadId/posts/:postId').send({}).expect(401);
  });

  it('Should return a status other than 401 if the user is signed in', async () => {
    const response = await agent.put('/api/threads/:theadId/posts/:postId').set('Cookie', global.signIn()).send({});

    expect(response.status).not.toEqual(401);
  });

  it('Should return 400 if the thread does not exist', async () => {
    await agent.put('/api/threads/:theadId/posts/:postId').set('Cookie', global.signIn()).send({}).expect(400);
  });
});
