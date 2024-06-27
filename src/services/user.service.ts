import * as UserDAO from '../daos/user.dao';
import { IUser } from '../models/user.model';

export const createUser = (userData: Partial<IUser>) => {
    return UserDAO.createUser(userData);
};

export const getUserById = (id: string) => {
    return UserDAO.getUserById(id);
};

export const getUsers = () => {
    return UserDAO.getUsers();
};

export const updateUser = (id: string, updateData: Partial<IUser>) => {
    return UserDAO.updateUser(id, updateData);
};

export const deleteUser = (id: string) => {
    return UserDAO.deleteUser(id);
};
