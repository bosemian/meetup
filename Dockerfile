FROM node:8.12.0-alpine
WORKDIR /unicorn_test/src
COPY ./package.json /unicorn_test/src/package.json
RUN npm install
COPY . /unicorn_test/src
RUN npm run build

FROM nginx:1.13.6
WORKDIR /usr/share/nginx/html
COPY /unicorn_test/src /unicorn/src/dist .
CMD ["nginx", "-g", "daemon off;"]
