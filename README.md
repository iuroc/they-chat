# 在线聊天室

## 开发环境

1. 安装依赖：`yarn`
2. 自动编译 TypeScript：`yarn tsc -w`
3. 自动打包：`yarn grunt`

## 运行项目

```bash
yarn http-server
```

## Docker 部署

```bash
docker stop they-chat
docker rm they-chat
docker rmi they-chat-image
git clone https://github.com/oyps/they-chat
docker build -t they-chat-image they-chat
docker run --name they-chat -p 3004:3004 -d they-chat-image
rm -rf they-chat
```