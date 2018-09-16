FROM nginx:1.13.6
COPY ./dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
