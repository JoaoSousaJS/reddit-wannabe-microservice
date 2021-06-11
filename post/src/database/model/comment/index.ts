import {
 Document, model, Model, Schema,
} from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CommentAttrs {
  postId: string
  version: number
  comments: string
}

interface CommentDocument extends Document{
  postId: string
  version: number
  comments: string
}

interface CommentModel extends Model<CommentDocument> {
    // eslint-disable-next-line no-unused-vars
  build(attrs: CommentAttrs): CommentDocument
}

const commentSchema = new Schema<CommentDocument, CommentModel>({
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

commentSchema.set('versionKey', 'version');
commentSchema.plugin(updateIfCurrentPlugin);

export const Comment = model<CommentDocument, CommentModel>('Comment', commentSchema);
