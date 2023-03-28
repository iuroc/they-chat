# 在线聊天室

## 启动开发环境

```bash
yarn dev
```

## 运行项目

```bash
yarn start
```

## Docker 部署

```bash
docker stop they-chat
docker rm they-chat
docker rmi they-chat-image
git clone https://github.com/oyps/they-chat
docker build -t they-chat-image they-chat
docker run --name they-chat -p 3004:3000 -d they-chat-image
rm -rf they-chat
```