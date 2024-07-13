import { User, IUser } from '../../models/user/user';

export const findUserByUsername = async (username: string): Promise<IUser | null> => {
    return User.findOne({ username });
};

export const createUser = async (user: IUser): Promise<IUser> => {
    const newUser = new User(user);
    return newUser.save();
};