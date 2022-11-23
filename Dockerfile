FROM node:18.12.1-alpine

RUN mkdir -p /var/cache
WORKDIR /var/cache
COPY package.json yarn.* ./

RUN yarn cache clean
RUN yarn install
ENV PATH /var/cache/node_modules/.bin:$PATH

RUN mkdir /react
WORKDIR /react
COPY . .

EXPOSE 8181
