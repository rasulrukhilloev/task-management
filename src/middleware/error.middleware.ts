import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.utils';

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details
      }
    });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'production' ? undefined : err.stack
    }
  });
};