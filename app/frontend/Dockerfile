FROM node:13.12.0-alpine
RUN mkdir /react
WORKDIR /react
COPY package.json /react/package.json
RUN npm install
COPY . ./