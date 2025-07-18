import express from 'express';
import authRoutes from './routes/auth.routes'; 
import itemRoutes from './routes/item.routes';
import { corsMiddleware } from './middlewares/cors'
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './middlewares/logger';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();
app.use(express.json());

// middlewares
app.use(errorHandler);// To catch all unhandled errors and send clean JSON responses.
app.use(corsMiddleware);// To allow your frontend (on different domain/port) to access backend APIs.
app.use(logger); // To log API requests for debugging and analytics.
app.use(rateLimiter); // To prevent abuse (too many requests from one user/IP)


// Main Routes
app.use('/api/auth', authRoutes); // base path for auth routes
app.use('/api/items', itemRoutes);// base path for item function routes

app.get('/', (req, res) => {
  res.send('Welcome to PicDrive API');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
