FROM node
ADD . /src/app
WORKDIR /src/app
RUN yarn add --production=true
EXPOSE 3004
CMD ["yarn", "http-server", "-p", "3004"]