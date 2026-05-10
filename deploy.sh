#!/bin/bash

echo "========== 拉取最新代码 =========="

git pull origin main

echo "========== 安装依赖 =========="

npm install

echo "========== 构建项目 =========="

npm run build

echo "========== 重启 PM2 =========="

pm2 restart all

echo "========== 完成 =========="

echo "https://xiaofengai.cloud"
