import { PostStatus } from '@reddit-wannabe/common';
import {
 Document, model, Model, Schema,
} from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface PostAttrs {
  title: string
  userId: string
  status?: PostStatus
  comments?: string[]
  threadId: string
  version?: number
}

export interface PostDocument extends Document {
  title: string
  userId: string
  status: PostStatus
  createdAt: Date
  comments?: string[]
  threadId: string
  version: number
  totalComments: number
}

export interface PostModel extends Model<PostDocument> {
    // eslint-disable-next-line no-unused-vars
  build(attrs: PostAttrs): PostDocument
}

const postSchema = new Schema<PostDocument, PostModel>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  status: {
    type: String,
    required: true,
    enum: [PostStatus],
    default: PostStatus.Active,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  threadId: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
  },
  totalComments: {
    type: Number,
  },

}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

postSchema.set('versionKey', 'version');
postSchema.plugin(updateIfCurrentPlugin);

postSchema.statics.build = (attrs: PostAttrs) => new Post({
  version: attrs.version,
  title: attrs.title,
  status: PostStatus.Active,
  userId: attrs.userId,
  threadId: attrs.threadId,
  comments: attrs.comments,
});

export const Post = model<PostDocument, PostModel>('Post', postSchema);
