import {
 Document, model, Model, Schema,
} from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ThreadStatus } from '../../types/thread-status';

interface ThreadAttrs {
  title: string
  userId: string
  version?: number
  status?: ThreadStatus
  postId?: [string]
}

interface ThreadDocument extends Document {
  title: string
  userId: string
  createdAt: Date
  version: number
  status: ThreadStatus
  postId?: [string]
}

interface ThreadModel extends Model<ThreadDocument> {
  // eslint-disable-next-line no-unused-vars
  build(attrs: ThreadAttrs): ThreadDocument
}

const threadSchema = new Schema<ThreadDocument, ThreadModel>({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  status: {
    type: String,
    required: true,
    enum: [ThreadStatus],
    default: ThreadStatus.Active,
  },
  postId: {
    type: Array,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

threadSchema.set('versionKey', 'version');
threadSchema.plugin(updateIfCurrentPlugin);

threadSchema.statics.build = (attrs: ThreadAttrs) => new Thread({
  version: attrs.version,
  title: attrs.title,
  status: ThreadStatus.Active,
  userId: attrs.userId,
});

export const Thread = model<ThreadDocument, ThreadModel>('Thread', threadSchema);
