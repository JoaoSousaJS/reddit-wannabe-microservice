import { ThreadStatus } from '@reddit-wannabe/common';
import {
 Document, model, Model, Schema,
} from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ThreadAttrs {
  status: ThreadStatus
  post?: string
  version?: number
}

interface ThreadDocument extends Document{
  status: ThreadStatus
  post?: string
  version: number
}

interface ThreadModel extends Model<ThreadDocument> {
    // eslint-disable-next-line no-unused-vars
  build(attrs: ThreadAttrs): ThreadDocument
}

const threadSchema = new Schema<ThreadDocument, ThreadModel>({
  status: {
    type: String,
    required: true,
    enum: [ThreadStatus],
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

threadSchema.set('versionKey', 'version');
threadSchema.plugin(updateIfCurrentPlugin);

threadSchema.statics.build = (attrs: ThreadAttrs) => new Thread({
  version: attrs.version,
  status: attrs.status,
  post: attrs.post,
});

export const Thread = model<ThreadDocument, ThreadModel>('Thread', threadSchema);
