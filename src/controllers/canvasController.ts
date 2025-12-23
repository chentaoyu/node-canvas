import { Request, Response, NextFunction } from "express";
import { CanvasService } from "../services/canvasService";
import { ValidationError } from "../utils/errors";

export class CanvasController {
  private canvasService: CanvasService;

  constructor() {
    this.canvasService = new CanvasService();
  }

  public generateCityscape = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { width, height } = req.query;

      const config: { width?: number; height?: number } = {};

      if (width) {
        const parsedWidth = parseInt(width as string, 10);
        if (isNaN(parsedWidth) || parsedWidth <= 0) {
          throw new ValidationError("Width must be a positive number");
        }
        config.width = parsedWidth;
      }

      if (height) {
        const parsedHeight = parseInt(height as string, 10);
        if (isNaN(parsedHeight) || parsedHeight <= 0) {
          throw new ValidationError("Height must be a positive number");
        }
        config.height = parsedHeight;
      }

      const imageBuffer = await this.canvasService.generateCityscape(config);

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Length", imageBuffer.length);
      res.status(200).send(imageBuffer);
    } catch (error) {
      next(error);
    }
  };
}
