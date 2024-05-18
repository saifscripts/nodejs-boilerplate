import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  const user = new User(userData);

  if (await user.isEmailExists(userData.email)) {
    throw Error('User already exist with this email!');
  }

  if (userData.mobile && (await User.isMobileExists(userData.mobile))) {
    throw Error('User already exist with this mobile!');
  }

  const result = await user.save();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findById(userId);
  if (!result) {
    throw new Error('User not found.');
  }
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();

  if (result.length === 0) {
    throw new Error('No user found.');
  }

  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne(
    { _id: userId },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getSingleUserFromDB,
  getAllUsersFromDB,
  deleteUserFromDB,
};
