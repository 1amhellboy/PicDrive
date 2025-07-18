import cors from 'cors';

// Cors middleware to allow your frontend (on different domain/port) to access backend APIs.

export const corsMiddleware = cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
});
