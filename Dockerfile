FROM nginx:1.13.6
COPY ./app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
