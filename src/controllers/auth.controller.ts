import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';
import { loginSchema } from '../dto/auth.dto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Registering new user', { email: req.body.email });
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            logger.warn('Validation error during user registration', { error: error.details[0].message });
            return res.status(400).json({ error: error.details[0].message });
        }

        const hashedPassword = await argon2.hash(req.body.password);
        const user = await AuthService.registerUser({ ...req.body, password: hashedPassword });
        logger.info('User registered successfully', { userId: user._id });
        return res.status(201).json(user);
    } catch (err) {
        logger.error('Error during user registration', { error: (err as Error).message });
        next(err);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('User login attempt', { email: req.body.email });
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            logger.warn('Validation error during user login', { error: error.details[0].message });
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await AuthService.getUserByEmail(req.body.email);
        if (!user) {
            logger.warn('User not found during login attempt', { email: req.body.email });
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await argon2.verify(user.password, req.body.password);
        if (!isPasswordValid) {
            logger.warn('Invalid password attempt', { email: req.body.email });
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        logger.info('User logged in successfully', { userId: user._id });
        return res.status(200).json({ token });
    } catch (err) {
        logger.error('Error during user login', { error: (err as Error).message });
        next(err);
    }
};
