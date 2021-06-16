import mongoose from 'mongoose';
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

  it('Should return 400 if the post does not exist', async () => {
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    await thread.save();
    await agent.put(`/api/threads/${thread.id}/posts/:postId`).set('Cookie', global.signIn()).send({}).expect(400);
  });

  it('Should return 401 if the post does not belong to the user', async () => {
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    const userId = mongoose.Types.ObjectId().toHexString();

    await thread.save();

    const post = Post.build({
      title: 'game',
      userId,
      threadId: thread.id,
    });

    await post.save();
    await agent.put(`/api/threads/${thread.id}/posts/${post.id}`).set('Cookie', global.signIn()).send({}).expect(401);
  });
});
