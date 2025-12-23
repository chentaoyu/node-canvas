import { Router } from 'express';
import { CanvasController } from '../controllers/canvasController';

const router = Router();
const canvasController = new CanvasController();

router.post('/generate', canvasController.generateCityscape);

export default router;

