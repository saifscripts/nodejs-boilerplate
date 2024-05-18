import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'] },
    mobile: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    status: { type: String, enum: ['active', 'blocked'], required: true },
    avatarURL: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtuals: derive a virtual field from the db fields
userSchema.virtual('fullName').get(function () {
  return 'Mr. ' + this.name;
});

// DOCUMENT MIDDLEWARE - pre hook(save): runs before save/create
userSchema.pre('save', async function (next) {
  const user: IUser = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcryptSaltRounds),
  );
  next();
});

// DOCUMENT MIDDLEWARE - post hook(save): runs after save/create
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// QUERY MIDDLEWARE - pre hook(find): runs before find query
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// QUERY MIDDLEWARE - pre hook(findOne): runs before findOne query
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Mongoose methods (instance methods)
userSchema.methods.isEmailExists = async function (email) {
  const result = await User.findOne({ email });
  return result;
};

// Mongoose statics (static methods)
userSchema.statics.isMobileExists = async function (mobile) {
  const result = await this.findOne({ mobile });
  return result;
};

export const User = model<IUser, UserModel>('User', userSchema);
