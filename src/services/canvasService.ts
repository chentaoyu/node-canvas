import { createCanvas, CanvasRenderingContext2D } from "canvas";
import { InternalServerError } from "../utils/errors";

export interface CanvasConfig {
  width: number;
  height: number;
}

export class CanvasService {
  private readonly defaultConfig: CanvasConfig = {
    width: 1200,
    height: 800,
  };

  public async generateCityscape(
    config?: Partial<CanvasConfig>
  ): Promise<Buffer> {
    const finalConfig = { ...this.defaultConfig, ...config };
    const canvas = createCanvas(finalConfig.width, finalConfig.height);
    const ctx = canvas.getContext("2d");

    try {
      this.drawSky(ctx, finalConfig);
      this.drawBuildings(ctx, finalConfig);
      this.addDetails(ctx, finalConfig);

      const buffer = canvas.toBuffer("image/png");
      return buffer;
    } catch (error) {
      throw new InternalServerError(
        `Failed to generate cityscape: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private drawSky(ctx: CanvasRenderingContext2D, config: CanvasConfig): void {
    const gradient = ctx.createLinearGradient(0, 0, 0, config.height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(0.3, "#16213e");
    gradient.addColorStop(1, "#0f3460");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, config.width, config.height);
  }

  private drawBuildings(
    ctx: CanvasRenderingContext2D,
    config: CanvasConfig
  ): void {
    this.drawBackgroundBuildings(ctx, config);
    this.drawLeftBuilding(ctx, config);
    this.drawCenterBuilding(ctx, config);
    this.drawRightSkyscraper(ctx, config);
    this.drawForegroundBuildings(ctx, config);
  }

  private drawBackgroundBuildings(
    ctx: CanvasRenderingContext2D,
    _config: CanvasConfig
  ): void {
    const buildings = [
      { x: 200, y: 300, width: 80, height: 400, color: "#1a1a2e" },
      { x: 300, y: 250, width: 70, height: 450, color: "#16213e" },
      { x: 500, y: 320, width: 90, height: 380, color: "#0f3460" },
      { x: 650, y: 280, width: 75, height: 420, color: "#1a1a2e" },
      { x: 800, y: 310, width: 85, height: 390, color: "#16213e" },
    ];

    buildings.forEach((building) => {
      ctx.fillStyle = building.color;
      ctx.fillRect(building.x, building.y, building.width, building.height);
      this.drawWindows(
        ctx,
        building.x,
        building.y,
        building.width,
        building.height,
        0.3
      );
    });
  }

  private drawLeftBuilding(
    ctx: CanvasRenderingContext2D,
    _config: CanvasConfig
  ): void {
    const x = 100;
    const y = 200;
    const w = 120;
    const h = 500;

    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(x, y, w, h);
    this.drawWindows(ctx, x, y, w, h, 0.4);
  }

  private drawCenterBuilding(
    ctx: CanvasRenderingContext2D,
    _config: CanvasConfig
  ): void {
    const x = 350;
    const y = 450;
    const w = 200;
    const h = 250;
    const radius = 15;

    ctx.fillStyle = "#e8e8e8";
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();

    for (let i = 0; i < 8; i++) {
      const windowY = y + 20 + i * 30;
      ctx.fillStyle = "#4a4a4a";
      ctx.fillRect(x + 10, windowY, w - 20, 2);

      if (Math.random() > 0.3) {
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(x + 15, windowY - 8, 25, 12);
      }
      if (Math.random() > 0.3) {
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(x + w - 40, windowY - 8, 25, 12);
      }
    }
  }

  private drawRightSkyscraper(
    ctx: CanvasRenderingContext2D,
    _config: CanvasConfig
  ): void {
    const x = 750;
    const y = 100;
    const w = 180;
    const h = 600;

    const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
    gradient.addColorStop(0, "#2a4a6a");
    gradient.addColorStop(0.3, "#1a3a5a");
    gradient.addColorStop(0.5, "#0a2a4a");
    gradient.addColorStop(0.7, "#1a3a5a");
    gradient.addColorStop(1, "#2a4a6a");

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w, h);

    const lightGradient = ctx.createLinearGradient(x, y, x + w, y + h * 0.4);
    lightGradient.addColorStop(0, "rgba(255, 200, 100, 0.3)");
    lightGradient.addColorStop(1, "rgba(255, 200, 100, 0)");
    ctx.fillStyle = lightGradient;
    ctx.fillRect(x, y, w, h * 0.4);

    this.drawWindows(ctx, x, y, w, h, 0.5);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + 20, y + h - 50, w - 40, 50);

    ctx.fillStyle = "#ffd700";
    ctx.fillRect(x + 30, y + h - 40, 40, 30);
    ctx.fillRect(x + w - 70, y + h - 40, 40, 30);
  }

  private drawForegroundBuildings(
    ctx: CanvasRenderingContext2D,
    _config: CanvasConfig
  ): void {
    const buildings = [
      { x: 50, y: 550, width: 100, height: 150, color: "#2a2a3a" },
      { x: 170, y: 580, width: 90, height: 120, color: "#1a1a2a" },
      { x: 280, y: 560, width: 110, height: 140, color: "#2a2a3a" },
    ];

    buildings.forEach((building) => {
      ctx.fillStyle = building.color;
      ctx.fillRect(building.x, building.y, building.width, building.height);
      this.drawWindows(
        ctx,
        building.x,
        building.y,
        building.width,
        building.height,
        0.2
      );
    });
  }

  private drawWindows(
    ctx: CanvasRenderingContext2D,
    buildingX: number,
    buildingY: number,
    buildingW: number,
    buildingH: number,
    lightRatio: number
  ): void {
    const windowSize = 12;
    const spacing = 15;
    const margin = 10;

    const cols = Math.floor((buildingW - margin * 2) / (windowSize + spacing));
    const rows = Math.floor((buildingH - margin * 2) / (windowSize + spacing));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = buildingX + margin + col * (windowSize + spacing);
        const y = buildingY + margin + row * (windowSize + spacing);

        if (Math.random() < lightRatio) {
          ctx.fillStyle = "#ffd700";
          ctx.fillRect(x, y, windowSize, windowSize);

          ctx.fillStyle = "#ffed4e";
          ctx.fillRect(x + 2, y + 2, windowSize - 4, windowSize - 4);
        } else {
          ctx.fillStyle = "#0a0a1a";
          ctx.fillRect(x, y, windowSize, windowSize);
        }
      }
    }
  }

  private addDetails(
    ctx: CanvasRenderingContext2D,
    config: CanvasConfig
  ): void {
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * config.width;
      const y = Math.random() * 200;
      const size = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = "rgba(255, 200, 100, 0.1)";
    ctx.fillRect(0, 0, config.width, config.height * 0.3);
    ctx.globalCompositeOperation = "source-over";
  }
}
