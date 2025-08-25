import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err); // Debug log

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Prisma unique constraint violation
  if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
    const target = err.meta?.target as string[] | string | undefined;
    if (target) {
      const field = Array.isArray(target) ? target.join(', ') : target;
      statusCode = 400;
      message = `${field} already in use`;
    }
  }

  // Handle common validation-related messages
  if (typeof message === 'string') {
    const lowerMsg = message.toLowerCase();
    if (
      lowerMsg.includes('already in use') ||
      lowerMsg.includes('must be at least') ||
      lowerMsg.includes('required') ||
      lowerMsg.includes('invalid')
    ) {
      statusCode = 400;
    }
  }

  // Always send JSON
  res.status(statusCode).json({
    error: message,
  });
};
