import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'] },
  mobile: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
  status: { type: String, enum: ['active', 'blocked'], required: true },
  avatarURL: String,
});

userSchema.pre('save', async function (next) {
  const user: IUser = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcryptSaltRounds),
  );
  next();
});

userSchema.post('save', async function () {
  const user: IUser = this;
  user.password = '';
});

userSchema.methods.isEmailExists = async function (email) {
  const result = await User.findOne({ email });
  return result;
};

userSchema.statics.isMobileExists = async function (mobile) {
  const result = await this.findOne({ mobile });
  return result;
};

export const User = model<IUser, UserModel>('User', userSchema);
