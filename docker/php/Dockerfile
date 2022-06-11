ARG PHP_VERSION=8.1.6-fpm-bullseye

FROM php:${PHP_VERSION}

RUN apt-get update

RUN apt-get install -y wget git procps libjpeg-dev libfreetype6-dev
RUN apt-get install -y  libmagick++-dev \
libmagickwand-dev \
libpq-dev \
libfreetype6-dev \
libjpeg62-turbo-dev \
libpng-dev \
libwebp-dev \
libxpm-dev

RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp && \
docker-php-ext-install -j$(nproc) gd

# xdebug install
# RUN pecl install xdebug \
#     && docker-php-ext-enable xdebug

# Timezone setting
ENV TZ Asia/Tokyo

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /php
