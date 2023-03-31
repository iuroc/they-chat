FROM node
ADD . /usr/app
WORKDIR /usr/app
RUN yarn install --production=true --ignore-scripts
EXPOSE 3000
CMD ["yarn", "start"]