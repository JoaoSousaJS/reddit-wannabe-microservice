import request from 'supertest';
import { app } from '../../../app';
import { clear, close, connect } from '../../../test/setup';

const agent = request.agent(app);

describe('Get Current User Controller', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());

  it('should return the details of the current user', async () => {
    const cookie = await global.signIn();

    const response = await agent.get('/api/users/me').set('Cookie', cookie)
    .send().expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
  });
});
