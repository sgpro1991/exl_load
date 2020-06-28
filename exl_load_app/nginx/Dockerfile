FROM nginx:1.17.0
RUN apt-get update
RUN apt-get install mc -y
COPY static /app/static
COPY conf.d /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]