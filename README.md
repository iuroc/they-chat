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

1. 拉取代码：`git clone https://github.com/oyps/they-chat`
2. 构建镜像：`docker build -t they-chat-image they-chat`
3. 运行容器：`docker run --name they-chat -p 3004:3000 -e MYSQL_HOST=172.17.0.6 -d they-chat-image`
    环境变量
    - `MYSQL_HOST`：数据库主机名，默认 `localhost`
    - `MYSQL_PORT`：数据库端口，默认 `3306`
    - `MYSQL_USER`：数据库用户名，默认 `root`
    - `MYSQL_PASSWORD`：数据库密码，默认 `12345678`
    - `MYSQL_DATABASE`：数据库名，默认 `ponconsoft`，不存在会自动创建

### 示例命令

```bash
docker stop they-chat
docker rm they-chat
docker rmi they-chat-image
git clone https://github.com/oyps/they-chat
docker build -t they-chat-image they-chat
docker run --name they-chat -p 3004:3000 -e MYSQL_HOST=mysql -d they-chat-image
rm -rf they-chat
```