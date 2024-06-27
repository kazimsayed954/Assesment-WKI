import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user.service';
import { createUserSchema, updateUserSchema } from '../dto/user.dto';
import logger from '../utils/logger';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Creating a new user', { email: req.body.email });
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            logger.warn('Validation error during user creation', { error: error.details[0].message });
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await UserService.createUser(req.body);
        logger.info('User created successfully', { userId: user._id });
        return res.status(201).json(user);
    } catch (err) {
        logger.error('Error during user creation', { error: (err as Error).message });
        next(err);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Fetching user by ID', { userId: req.params.userId });
    try {
        const user = await UserService.getUserById(req.params.userId);
        if (!user) {
            logger.warn('User not found', { userId: req.params.userId });
            return res.status(404).json({ error: 'User not found' });
        }

        logger.info('User fetched successfully', { userId: user._id });
        return res.status(200).json(user);
    } catch (err) {
        logger.error('Error fetching user by ID', { error: (err as Error).message });
        next(err);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Fetching all users');
    try {
        const users = await UserService.getUsers();
        logger.info('Users fetched successfully', { count: users.length });
        return res.status(200).json(users);
    } catch (err) {
        logger.error('Error fetching users', { error: (err as Error).message });
        next(err);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Updating user', { userId: req.params.userId });
    try {
        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            logger.warn('Validation error during user update', { error: error.details[0].message });
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await UserService.updateUser(req.params.userId, req.body);
        if (!user) {
            logger.warn('User not found during update', { userId: req.params.userId });
            return res.status(404).json({ error: 'User not found' });
        }

        logger.info('User updated successfully', { userId: user._id });
        return res.status(200).json(user);
    } catch (err) {
        logger.error('Error during user update', { error: (err as Error).message });
        next(err);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Deleting user', { userId: req.params.userId });
    try {
        const user = await UserService.deleteUser(req.params.userId);
        if (!user) {
            logger.warn('User not found during deletion', { userId: req.params.userId });
            return res.status(404).json({ error: 'User not found' });
        }

        logger.info('User deleted successfully', { userId: user._id });
        return res.status(200).json(user);
    } catch (err) {
        logger.error('Error during user deletion', { error: (err as Error).message });
        next(err);
    }
};
