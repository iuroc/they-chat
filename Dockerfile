FROM node
ADD . /usr/app
WORKDIR /usr/app
RUN yarn install --production=true --ignore-scripts
RUN yarn add global concurrently
EXPOSE 3000
CMD ["yarn", "start"]