import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { clear, close, connect } from '../../test/setup';
import { Post } from '../../database/model/post';

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
    const userId = mongoose.Types.ObjectId().toHexString();

    await agent.post('/api/threads').set('Cookie', global.signIn()).send({
      title: 'Games',
      userId,
    }).expect(201);

    await agent.post('/api/threads').set('Cookie', global.signIn()).send({
      title: 'Games 2',
      userId,
    }).expect(201);

    const response = await agent.get('/api/threads');

    expect(response.body).toHaveLength(2);
  });

  it('Should list all posts attached to the threads', async () => {
    const userId = mongoose.Types.ObjectId().toHexString();
    const postOne = Post.build({
      title: 'Nintendo',
      totalComments: 2,
    });

    await postOne.save();

    const postTwo = Post.build({
      title: 'Ps5',
      totalComments: 12,
    });

    await postTwo.save();

    await agent.post('/api/threads').set('Cookie', global.signIn()).send({
      title: 'Games 2',
      userId,
      post: [postOne.id, postTwo.id],
    }).expect(201);

    const response = await agent.get('/api/threads');

    expect(response.body[0].post).toHaveLength(2);
  });
});
