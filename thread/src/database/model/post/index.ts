import {
 Document, model, Model, Schema,
} from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { PostStatus } from '../../types/post-status';

export interface PostAttrs {
  title: string
  status?: PostStatus
  totalComments: number
  version?: number
}

interface PostDocument extends Document {
  title: string
  status?: PostStatus
  totalComments: number
  version?: number
}

interface PostModel extends Model<PostDocument> {
  // eslint-disable-next-line no-unused-vars
  build(attrs: PostAttrs): PostDocument
}

const postSchema = new Schema<PostDocument, PostModel>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    enum: [PostStatus],
    default: PostStatus.Active,
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
  title: attrs.title,
  status: PostStatus.Active,
  totalComments: attrs.totalComments,
});

export const Post = model<PostDocument, PostModel>('Post', postSchema);
