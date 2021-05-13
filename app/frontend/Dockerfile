FROM node:12.18.2-alpine as frontend
ARG REACT_APP_ENVIRONMENT
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_HOSTNAME

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

FROM nginx:stable-alpine

COPY --from=frontend /app/build /usr/share/nginx/html
COPY --from=frontend /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
