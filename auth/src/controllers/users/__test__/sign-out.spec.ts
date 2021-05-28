import request from 'supertest';
import { app } from '../../../app';
import { clear, close, connect } from '../../../test/setup';

const agent = request.agent(app);

describe('Sign out Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should logout the current user', async () => {
    const cookie = await global.signIn();

    const response = await agent.post('/api/users/signout').set('Cookie', cookie)
    .send({}).expect(200);

    expect(response.get('Set-Cookie')).toBeUndefined();
  });
});
