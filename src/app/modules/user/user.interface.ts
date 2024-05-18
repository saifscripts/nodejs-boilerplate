import { HydratedDocument, Model } from 'mongoose';

export interface IUser {
  name: string;
  gender?: 'male' | 'female';
  mobile?: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  avatarURL?: string;
  isDeleted: boolean;
}

// interface for mongoose methods
export interface IUserMethods extends Model<IUser> {
  isEmailExists(email: string): Promise<IUser | null>;
}

// interface for mongoose statics
export interface UserModel extends Model<IUser, {}, IUserMethods> {
  isMobileExists(mobile: string): Promise<HydratedDocument<IUser | null>>;
}
