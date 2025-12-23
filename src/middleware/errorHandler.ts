import { Request, Response, NextFunction } from 'express';
import { AppError, NotFoundError, sendErrorResponse } from '../utils/errors';

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  sendErrorResponse(res, err);
}

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  const error = new NotFoundError(`Not Found - ${_req.originalUrl}`);
  next(error);
}

