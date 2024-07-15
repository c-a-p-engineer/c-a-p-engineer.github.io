ARG PHP_VERSION=8.1.6-fpm-bullseye

FROM php:${PHP_VERSION}

RUN apt-get update \
    # 基本
    && apt-get install -y wget git procps \
    # 画像関連
    libjpeg-dev libfreetype6-dev \
    libmagick++-dev \
    libmagickwand-dev \
    libpq-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxpm-dev \
    # ZIP関連
    libzip-dev unzip \
    && docker-php-ext-install zip \
    # 掃除
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd

# xdebug install
# RUN pecl install xdebug \
#     && docker-php-ext-enable xdebug

# Timezone setting
ENV TZ Asia/Tokyo

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /php
