# Node Canvas 城市天际线绘制项目

使用 node-canvas 库绘制城市天际线图片，基于 Express 和 TypeScript 构建的 RESTful API 服务。

## 项目架构

项目采用分层架构设计：

```
src/
├── app.ts              # Express 应用配置（分离 app 和 server）
├── server.ts           # 服务器启动入口
├── routes/             # 路由层
│   ├── index.ts       # 路由聚合
│   └── canvasRoutes.ts
├── controllers/        # 控制器层
│   └── canvasController.ts
├── services/           # 服务层（业务逻辑）
│   └── canvasService.ts
├── middleware/         # 中间件层
│   └── errorHandler.ts # 集中错误处理
└── utils/              # 工具函数
    └── errors.ts       # 错误类型定义
```

## 特性

- ✅ TypeScript 支持
- ✅ Express 服务器
- ✅ 分层架构设计
- ✅ 分离 Express 'app' 和 'server'
- ✅ 集中错误处理（不在中间件中处理业务错误）
- ✅ ESLint 代码检查

## 安装依赖

```bash
npm install
```

**注意**: `canvas` 是一个原生模块，需要系统依赖。如果遇到 "invalid ELF header" 错误，说明原生模块需要重新编译：

1. 确保系统已安装必要的依赖（Linux）:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
   
   # Alpine Linux
   apk add --no-cache build-base cairo-dev jpeg-dev pango-dev giflib-dev
   ```

2. 重新安装依赖（会自动触发 postinstall 脚本重建原生模块）:
   ```bash
   npm install
   ```

3. 如果问题仍然存在，手动重建 canvas 模块:
   ```bash
   npm rebuild canvas --build-from-source
   ```

## Docker 部署

项目包含 Dockerfile，已配置好所有系统依赖，可以直接构建和运行：

### 配置 Docker 镜像加速器（解决网络超时问题）

如果遇到 `DeadlineExceeded` 或网络超时错误，需要配置 Docker 镜像加速器：

**macOS (Docker Desktop)**:
1. 打开 Docker Desktop
2. 点击 Settings → Docker Engine
3. 确保配置中包含镜像加速器（已自动配置到 `~/.docker/daemon.json`）
4. 点击 "Apply & Restart" 重启 Docker

**或者手动配置**:
```bash
# 配置文件位置: ~/.docker/daemon.json
# 已自动添加以下镜像源:
# - https://docker.mirrors.ustc.edu.cn
# - https://hub-mirror.c.163.com
# - https://mirror.baidubce.com
```

### 构建 Docker 镜像

```bash
# 使用标准 Dockerfile（需要配置镜像加速器）
docker build -t node-canvas-cityscape .

# 或使用国内镜像源版本（推荐，如果网络不稳定）
docker build -f Dockerfile.cn -t node-canvas-cityscape .
```

### 运行 Docker 容器

```bash
# 基本运行
docker run -p 3000:3000 node-canvas-cityscape

# 指定端口和环境变量
docker run -p 8080:3000 -e PORT=3000 node-canvas-cityscape
```

### Dockerfile 说明

Dockerfile 已包含以下配置：
- ✅ Node.js 20 Alpine 基础镜像
- ✅ Canvas 所需的所有系统依赖（Cairo, Pango, JPEG, GIF, SVG 等）
- ✅ 自动重建 canvas 原生模块（通过 postinstall 脚本）
- ✅ TypeScript 编译
- ✅ 生产环境优化

**Dockerfile.cn** (备选方案):
- 使用阿里云镜像源的基础镜像
- 配置 npm 使用淘宝镜像源
- 适合网络不稳定或无法访问 Docker Hub 的情况

**注意**: Dockerfile 使用 Alpine Linux，已自动安装所有必要的系统依赖，无需手动配置。

## 开发

```bash
# 开发模式（自动重启）
npm run dev

# 构建 TypeScript
npm run build

# 生产模式
npm start
```

## 代码检查

```bash
# 运行 ESLint
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix
```

## API 使用

### 健康检查

```bash
GET /api/health
```

### 生成城市天际线

```bash
POST /api/canvas/generate

# 查询参数（可选）:
# - width: 画布宽度（默认: 1200）
# - height: 画布高度（默认: 800）
# - outputPath: 输出文件路径（默认: ./cityscape.png）

# 示例:
curl -X POST "http://localhost:3000/api/canvas/generate?width=1600&height=1000"
```

## 错误处理

项目采用集中错误处理机制：

- 所有业务错误通过 `next(error)` 传递给错误处理中间件
- 错误处理中间件统一格式化错误响应
- 支持自定义错误类型：`AppError`, `NotFoundError`, `ValidationError`, `InternalServerError`

## 项目结构说明

- **app.ts**: Express 应用配置，包含中间件和路由设置
- **server.ts**: 服务器启动逻辑，处理优雅关闭
- **routes/**: 定义 API 路由
- **controllers/**: 处理 HTTP 请求，调用服务层
- **services/**: 业务逻辑实现（Canvas 绘制逻辑）
- **middleware/**: Express 中间件（错误处理、404 处理）
- **utils/**: 工具函数和类型定义

## 技术栈

- Node.js
- Express
- TypeScript
- node-canvas
- ESLint
