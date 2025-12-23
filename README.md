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
