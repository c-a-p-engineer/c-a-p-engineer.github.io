ARG PHP_VERSION=8.0.1-fpm-alpine3.12

FROM php:${PHP_VERSION}

RUN apk update && \
    apk add --update --no-cache \
     shadow \
     bash && \
    docker-php-ext-install pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# node のインストール npm のため
RUN apk add --update nodejs nodejs-npm

WORKDIR /php
