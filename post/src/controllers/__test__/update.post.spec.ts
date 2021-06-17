import { ThreadStatus } from '@reddit-wannabe/common';
import request from 'supertest';
import { app } from '../../app';
import { Thread } from '../../database/model/thread';
import { clear, close, connect } from '../../test/setup';
import { Post } from '../../database/model/post';

const agent = request.agent(app);

describe('Update Post', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/threads/:theadId/posts/:postId for posts requests', async () => {
    const response = await agent.patch('/api/threads/:theadId/posts/:postId').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should only be accessed if user is signed in', async () => {
    await agent.patch('/api/threads/:theadId/posts/:postId').send({}).expect(401);
  });

  it('Should return a status other than 401 if the user is signed in', async () => {
    const response = await agent.patch('/api/threads/:theadId/posts/:postId').set('Cookie', global.signIn()).send({});

    expect(response.status).not.toEqual(401);
  });

  it('Should return 400 if the thread does not exist', async () => {
    await agent.patch('/api/threads/:theadId/posts/:postId').set('Cookie', global.signIn()).send({}).expect(400);
  });

  it('Should return 400 if the post does not exist', async () => {
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    await thread.save();
    await agent.patch(`/api/threads/${thread.id}/posts/:postId`).set('Cookie', global.signIn()).send({}).expect(400);
  });

  it('Should return 401 if the post does not belong to the user', async () => {
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    const cookie = global.signIn();

    await thread.save();

    await agent.post(`/api/threads/${thread.id}/posts`).set('Cookie', cookie).send({
      title: 'Game',
    });

    const posts = await Post.find({});

    await agent.patch(`/api/threads/${thread.id}/posts/${posts[0].id}`).set('Cookie', global.signIn()).send({
      title: 'game updated',
    }).expect(401);
  });
});
