FROM node:8.12.0-alpine
WORKDIR /unicorn/src
COPY ./package.json /unicorn/src/package.json
RUN npm install
COPY . /unicorn/src
RUN npm run build

FROM nginx:1.13.6
WORKDIR /usr/share/nginx/html
COPY /unicorn/src/dist/* /unicorn/src/dist .
CMD ["nginx", "-g", "daemon off;"]
