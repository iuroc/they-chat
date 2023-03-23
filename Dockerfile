FROM node
ADD . /src/app
WORKDIR /src/app
RUN yarn install --production=true --ignore-scripts
EXPOSE 3004
CMD ["yarn", "http-server", "-p", "3004"]