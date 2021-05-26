import {
  Document, model, Model, Schema,
} from 'mongoose';
import { Password } from '../../service/password';
import { UserStatus } from '../../types/user-status';

interface UserAttrs {
  email: string
  password: string
  status: UserStatus
}

interface UserDocument extends Document {
  email: string
  password: string
  status: UserStatus
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
      delete ret.password;
      delete ret.__v;
    },
  },
});

userSchema.statics.build = (attrs: UserAttrs) => new User({
  email: attrs.email,
  status: UserStatus.Active,
  password: attrs.password,
});

userSchema.pre('save', async function signUp(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

export const User = model<UserDocument, UserModel>('Order', userSchema);
