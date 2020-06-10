#!/usr/bin/env bash
if [ ! -f "/var/cert/dhparam.pem" ]
then
    mkdir -p /var/cert
    openssl dhparam -dsaparam -out /var/cert/dhparam.pem 2048
fi
certbot certonly -n \
  -m "contact.mago.tech@gmail.com" \
  -d "sanctus.cc" \
  --standalone --agree-tos

certbot certonly -n \
  -m "contact.mago.tech@gmail.com" \
  -d "leitunereguly.com" \
  --standalone --agree-tos