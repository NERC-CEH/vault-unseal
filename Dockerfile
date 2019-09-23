FROM node:8.16.1-alpine

WORKDIR /usr/src/app
COPY src/ /usr/src/app/
RUN yarn install --production && yarn cache clean

CMD ["node", "/usr/src/app/unseal.js"]
