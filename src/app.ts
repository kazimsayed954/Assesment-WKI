import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';

import { authenticateToken } from './middleware/auth.middleware';
import { customRateLimiterMiddleware } from './middleware/ratelimitter.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/v1/user',customRateLimiterMiddleware,authenticateToken, userRoutes);
app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
