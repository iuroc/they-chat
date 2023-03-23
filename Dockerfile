FROM node
ADD . /src/app
WORKDIR /src/app
RUN yarn add --production=true --ignore-scripts
EXPOSE 3004
CMD ["yarn", "http-server", "-p", "3004"]