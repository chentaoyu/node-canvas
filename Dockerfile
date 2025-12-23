# 使用 Node.js 20 官方镜像
FROM node:20-alpine

# 安装 canvas 所需的系统依赖
# Alpine Linux 使用 apk 包管理器
RUN apk add --no-cache \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    librsvg-dev \
    python3 \
    make \
    g++

# 设置工作目录
WORKDIR /code

# 复制 package 文件
COPY package*.json ./

# 安装所有依赖（包括 devDependencies，用于构建 TypeScript）
# postinstall 脚本会自动重建 canvas 原生模块
RUN npm ci

# 复制源代码
COPY . .

# 构建 TypeScript
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]

