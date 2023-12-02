---
title: PHP でグラフィックをやってみる
date: 2023-12-02T04:00:00+09:00
description: PHP でグラフィックをやれるか気になってやってみました！
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# PHP でグラフィックをやってみる
PHP でグラフィックをやれるか気になってやってみました！

## PHP-GLFW
PHP でグラフィックをやる方法がないかと探していたら `PHP-GLFW` なるものを見つけました。

- <a href="https://phpgl.net/index.html" target="_blank" rel="nofollow noopener">PHP-GLFW</a>

これはPHPからOpenGLなどのグラフィックを触るためのライブラリのようです。

## インストール方法

ここに記載されている方法で設定することが可能です。

- <a href="https://phpgl.net/getting-started/getting-started-with-php-and-opengl.html" target="_blank" rel="nofollow noopener">Gettings Started with PHP & OpenGL</a>

### Dockerで構築してみた

```Dockerfile
########## Pull ##########
FROM nvidia/cuda:12.0.0-base-ubuntu22.04

########## Non-interactive ##########
ENV DEBIAN_FRONTEND=noninteractive

# 必要なパッケージ
RUN apt update \
    # 基本
    && apt install -y \
    wget \
    git \
    procps \
    vim \
    # ZIP関連
    libzip-dev \
    unzip \
    # 掃除
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

#################################################
# X Windows System 設定
# DISPLAY=Xサーバー名:ディスプレイ番号.スクリーン番号
ENV DISPLAY host.docker.internal:0.0

RUN apt-get update && apt-get install -y --no-install-recommends \
    # X11
    x11-apps \
    x11-xserver-utils \
    # グラフィックライブラリ
    mesa-utils \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

#################################################
# PHPのインストール
RUN apt update && apt install -y \
    ca-certificates \
    apt-transport-https \
    software-properties-common \
    lsb-release \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*
RUN add-apt-repository ppa:ondrej/php -y

# Install PHP 8.2 packages
RUN apt update && apt install -y \
    php \
    php-dev\
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

# 必要なパッケージと依存関係をインストール
RUN apt update && apt install -y \
    cmake \
    git \
    # X11
    libxrandr-dev \
    libxinerama-dev \
    libxcursor-dev \
    libxi-dev \
    libxxf86vm-dev \
    # OpenGL開発ツール (OpenGL使用時)
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    # GLFW
    libglfw3 \
    libglfw3-dev

#################################################
# PHP GFLW
# ソースからビルド
WORKDIR /usr/src
RUN git clone https://github.com/mario-deluna/php-glfw
WORKDIR /usr/src/php-glfw
RUN phpize && ./configure --enable-glfw && make && make install

# PHPにPHPGLFW拡張を読み込む設定
RUN echo "extension=glfw.so" > /etc/php/8.2/cli/conf.d/glfw.ini
# コンテナ起動時の作業ディレクトリの設定

#################################################
# PHP Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

```

Dockerfile が用意できたらイメージのビルド。
```bash
docker build -t php-opengl-image .
```

そしてコンテナを起動。
```bash
docker run --rm --gpus all -it php-opengl-image
```

まずはグラフィックが動くかの確認をする必要があります。

```bash
glxgears
```

グラフィックが動くと下記のような歯車画面が出てきて歯車が回ります。

![glxgears](/tech/2023/12/02/php-docker-glfw/glxgears.gif "glxgears.gif") 

## サンプル

実際にPHPのコードを動かしてみましょう。

```php:sample.php
<?php
if (!glfwInit()) {
    throw new Exception('GLFW could not be initialized!');
}

glfwWindowHint(GLFW_RESIZABLE, GL_TRUE);
glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

if (!$window = glfwCreateWindow(800, 600, "PHP GLFW Demo")) {
    throw new Exception('OS Window could not be initialized!');
}

glfwMakeContextCurrent($window);
glfwSwapInterval(1);

while (!glfwWindowShouldClose($window))
{
    glfwPollEvents();
    glfwGetCursorPos($window, $mouseX, $mouseY);
    glClearColor(sin($mouseX / 300), sin($mouseY / 300), cos($mouseY / 300), 1);
    glClear(GL_COLOR_BUFFER_BIT);
    glfwSwapBuffers($window);
}

glfwDestroyWindow($window);
glfwTerminate();

```

実際にサンプルファイルを起動してみます。

```bash
php sample.php
```

これはマウスの位置によって背景色が変わるものです。

![glxgears](/tech/2023/12/02/php-docker-glfw/php-glfw.gif "php-glfw.gif") 


## その他サンプル

他にもさまざまなサンプルなどがあります。

- <a href="https://phpgl.net/examples/00-about-examples.html" target="_blank" rel="nofollow noopener">Examples</a>


![3d-cube](/tech/2023/12/02/php-docker-glfw/3d-cube.gif "3d-cube.gif") 

## まとめ

PHPでは普通では触らないグラフィックですが、実際に触ってみると色々と面白そうです。

実際にこれでゲームを作っている方もいるみたいです。
