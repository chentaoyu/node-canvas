import { Router } from 'express';
import canvasRoutes from './canvasRoutes';

const router = Router();

router.use('/canvas', canvasRoutes);

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});

export default router;

