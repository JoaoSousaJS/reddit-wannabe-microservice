import { ThreadStatus } from '@reddit-wannabe/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Post } from '../../database/model/post';
import { Thread } from '../../database/model/thread';
import { clear, close, connect } from '../../test/setup';

const agent = request.agent(app);

describe('New Post', () => {
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

  it('should return 400 if the thread is inactive', async () => {
    const thread = Thread.build({
      status: ThreadStatus.Inactive,
    });

    await thread.save();
    await agent.post(`/api/threads/${thread.id}/posts`).set('Cookie', global.signIn()).send({
      title: 'game post',
    }).expect(400);
  });

  it('should return 400 if the post title already exist', async () => {
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    await thread.save();

    const randomId = mongoose.Types.ObjectId().toHexString();
    const post = Post.build({
      title: 'game post',
      userId: randomId,
      threadId: thread.id,
    });

    await post.save();

    await agent.post(`/api/threads/${thread.id}/posts`).set('Cookie', global.signIn()).send({
      title: 'game post',
    }).expect(400);
  });

  it('Should save the post and attach it in a thread', async () => {
    let posts = await Post.find({});

    expect(posts).toHaveLength(0);
    const thread = Thread.build({
      status: ThreadStatus.Active,
    });

    await thread.save();

    await agent.post(`/api/threads/${thread.id}/posts`).set('Cookie', global.signIn()).send({
      title: 'game post',
    }).expect(201);

    posts = await Post.find({});

    expect(posts).toHaveLength(1);

    const threads = await Thread.find({});

    expect(threads[0].post).toHaveLength(1);
    expect(threads[0].post[0]).toEqual(posts[0]._id);
  });
});
