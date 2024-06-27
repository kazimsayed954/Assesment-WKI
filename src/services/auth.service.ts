import { IAuth } from "../models/auth.model";
import * as AuthDAO from '../daos/auth.dao';

export const registerUser = (userData: IAuth) => {
    return AuthDAO.registerUser(userData);
};


export const getUserByEmail = (email: string) => {
    return AuthDAO.getUserByEmail(email);
};