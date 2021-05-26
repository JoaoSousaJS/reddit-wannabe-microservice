import {
  Document, model, Model, Schema,
} from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { UserStatus } from '../../types/user-status';

interface UserAttrs {
  id: string
  email: string
  password: string
  status: UserStatus
  version: number
}

interface UserDocument extends Document {
  email: string
  password: string
  status: UserStatus
  version: number
}

interface UserModel extends Model<UserDocument> {
  // eslint-disable-next-line no-unused-vars
  build(attrs: UserAttrs): UserDocument
}

const userSchema = new Schema<UserDocument, UserModel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => new User({
  _id: attrs.id,
  version: attrs.version,
  email: attrs.email,
  status: attrs.status,
  password: attrs.password,
});

export const User = model<UserDocument, UserModel>('Order', userSchema);
