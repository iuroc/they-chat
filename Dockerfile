FROM node
ADD . /src/app
WORKDIR /src/app
RUN yarn install --production=true --ignore-scripts
RUN yarn add http-server
EXPOSE 3004
CMD ["yarn", "http-server", "-p", "3004"]