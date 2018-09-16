FROM node:8.12.0-alpine
RUN mkdir -p /unicorn-test
WORKDIR /unicorn-test
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.13.6
COPY /unicorn-test/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
