import Auth, { IAuth } from '../models/auth.model';

export const registerUser = async (userData: Partial<IAuth>): Promise<IAuth> => {
    const user = new Auth(userData);
    return user.save();
};

export const getUserByEmail = async (email:string) => {
    return Auth.findOne({ email }).exec();
};

