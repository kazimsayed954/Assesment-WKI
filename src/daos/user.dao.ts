import User, { IUser } from '../models/user.model';

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    return User.findOne({ _id: id, deleted: false }).exec();
};

export const getUsers = async (): Promise<IUser[]> => {
    return User.find({ deleted: false }).exec();
};

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return User.findOneAndUpdate({ _id: id, deleted: false }, updateData, { new: true }).exec();
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, { deleted: true }, { new: true }).exec(); 
};
