import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthenticatedRequest, TokenPayload } from '../types';
import { AppError } from './errorHandler';

export function authenticateToken(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    throw new AppError('Authentication required. Missing bearer token.', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as TokenPayload;
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('Access token expired. Please refresh your session.', 401);
    }
    throw new AppError('Invalid authentication token.', 401);
  }
}
