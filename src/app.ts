import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import taskRoutes from './routes/tasks.route';
import adminRoutes from './routes/admin.route';
import { errorHandler } from './middleware/error.middleware';
import { rateLimiter } from './utils/rateLimiter.utils';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;