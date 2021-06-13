import request from 'supertest';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('New Thread', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/posts for threads requests', async () => {
    const response = await agent.post('/api/threads/:theadId/posts').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.post('/api/threads/:theadId/posts').send({}).expect(401);
  });

  it('Should return a status other than 401 if the user is signed in', async () => {
    const response = await agent.post('/api/threads/:theadId/posts').set('Cookie', global.signIn()).send({});

    expect(response.status).not.toEqual(401);
  });

  it('Should return 400 if the title is blank or invalid', async () => {
    await agent.post('/api/threads/:theadId/posts').set('Cookie', global.signIn()).send({
      title: '',
    }).expect(400);
  });

  it('should return 400 if the thread does not exist', async () => {
    await agent.post('/api/threads/:theadId/posts').set('Cookie', global.signIn()).send({
      title: 'game post',
    }).expect(400);
  });
});
