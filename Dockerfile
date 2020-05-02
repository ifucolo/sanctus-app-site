FROM nginx:1.15.9
RUN apt-get update -y \
    && apt-get install certbot python-certbot-nginx -y
COPY ./rootfs /
CMD sh /entrypoint.sh