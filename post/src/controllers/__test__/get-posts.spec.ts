import { ThreadStatus } from '@reddit-wannabe/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Post } from '../../database/model/post';
import { Thread } from '../../database/model/thread';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('Get Posts', () => {
  beforeAll(async () => connect());
  beforeEach(async () => clear());
  afterAll(async () => close());
  it('Should handler listening to /api/posts for posts requests', async () => {
    const response = await agent.get('/api/threads/:theadId/posts/:postId').send({});

    expect(response.status).not.toEqual(404);
  });

  it('Should return 400 if the thread does not exist', async () => {
    await agent.get('/api/threads/:theadId/posts/:postId').expect(400);
  });

  it('Should return 400 if the post does not exist', async () => {
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    await thread.save();
    await agent.get(`/api/threads/${thread.id}/posts/:postId`).expect(400);
  });

  it('Should return the details of the post', async () => {
    const userId = mongoose.Types.ObjectId().toHexString();
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    await thread.save();

    const post = Post.build({
      title: 'game',
      threadId: thread.id,
      userId,

    });
    await post.save();

    const response = await agent.get(`/api/threads/${thread.id}/posts/${post.id}`).expect(200);

    expect(response.body.title).toEqual('game');
  });
});
