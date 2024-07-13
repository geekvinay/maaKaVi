import { IUser, User} from '../../models/user/user';

// Define the type for userData parameter
export const createUserInDb = async (userData: IUser) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// Define the type for userId parameter
export const getUserFromDb = async (userId: string) => {
  const user = await User.findById(userId);
  return user;
};