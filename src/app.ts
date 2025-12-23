import express, { Express } from 'express';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export function createApp(): Express {
  const app = express();

  // 中间件
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 路由
  app.use('/api', routes);

  // 404 处理
  app.use(notFoundHandler);

  // 错误处理（必须在最后）
  app.use(errorHandler);

  return app;
}

