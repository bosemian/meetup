FROM node:8.12.0-alpine
WORKDIR /unicorn_test
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.13.6
COPY --from=0 /unicorn_test/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
