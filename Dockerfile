FROM node:8.12.0-alpine
WORKDIR /unicorn/src
COPY ./package.json /unicorn/package.json
RUN npm install
COPY . /unicorn/
RUN npm run build

FROM nginx:1.13.6
WORKDIR /usr/share/nginx/html
COPY /unicorn/dist/* /unicorn/src/dist .
CMD ["nginx", "-g", "daemon off;"]
