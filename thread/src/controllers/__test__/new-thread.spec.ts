import request from 'supertest';
import { app } from '../../app';

const agent = request.agent(app);

describe('New Thread', () => {
  it('Should handler listening to /api/threads for threads requests', async () => {
    const response = await agent.post('/api/threads').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.post('/api/threads').send({}).expect(401);
  });
});
