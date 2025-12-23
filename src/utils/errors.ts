import { Response } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation error') {
    super(message, 400);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
  }
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    stack?: string;
  };
}

export function sendErrorResponse(res: Response, error: AppError | Error): void {
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
        statusCode: error.statusCode,
      },
    };

    if (process.env.NODE_ENV === 'development') {
      response.error.stack = error.stack;
    }

    res.status(error.statusCode).json(response);
  } else {
    // 未知错误，不暴露给客户端
    const response: ErrorResponse = {
      success: false,
      error: {
        message: 'An unexpected error occurred',
        statusCode: 500,
      },
    };

    if (process.env.NODE_ENV === 'development') {
      response.error.stack = error.stack;
    }

    res.status(500).json(response);
  }
}

