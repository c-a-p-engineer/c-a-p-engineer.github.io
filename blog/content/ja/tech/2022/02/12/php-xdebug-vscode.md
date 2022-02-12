---
title: "【PHP】VSCode で Xdebug を使用してデバッグをする方法"
date: 2021-02-12T17:00:00+09:00
description: "VSCode を使用しての PHP デバッグ方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】VSCode で Xdebug を使用してデバッグをする方法
VSCode を使用しての PHP デバッグ方法メモ。

## 前提
* VSCode をエディタとして利用
  * プラグイン <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers" target="_blank" rel="nofollow noopener">Remote - Containers</a> 導入済み
* Docker を導入済み

簡単にご説明しますと Docker 内で VSCode が起動するので環境が同一になるように作られています。
* <a href="https://code.visualstudio.com/docs/remote/containers" target="_blank" rel="nofollow noopener">Developing inside a Container using Visual Studio Code Remote Development</a>

## ディレクトリ構造
```
├── .vscode
│   └── launch.json
├── docker
│   └── web
│       ├── Dockerfile
│       └── xdebug.ini
├── docker-compose.yml
└── src
    └── index.php
```

## Docker環境構築

### docker-compose.yml
`docker-compose.yml` を用意
```yml:docker-compose.yml
version: '3'

services:
    web:
        container_name: web
        build: ./docker/web
        ports:
            - '8080:80'
        volumes:
            - ./src:/var/www/html
            - ./docker/web/xdebug.ini:/usr/local/etc/php/conf.d/xdebug.ini
```

### Dockerfile
PHP の `Dockerfile` を用意。
```yml:docker/web/Dockerfile
FROM php:8.1.2-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    vim

# xdebug インストール
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug
```

### xedebug.ini
`xdebug`の設定（`php.ini` に含めてもOK
```ini:docker/web/xdebug.ini
[xdebug]
; xdebug のモード（debug
xdebug.mode=debug
; デバッグの開始
xdebug.start_with_request=yes
; ホスト指定
xdebug.client_host=host.docker.internal
; ホスト側のポート指定
xdebug.client_port=9003
```

## VScode

### デバッグ用設定ファイル
`debug` 設定
```json:.vscode/launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9003, // php.iniで設定したポート番号
            "pathMappings": {
                // Dockerのドキュメントルート:ローカルのドキュメントルート
                "/var/www/html/": "${workspaceRoot}/php"
            }
        }
    ]
}
```

### プラグインインストール
PHPデバッグをのプラグインをVSCodeにインストール<br>
<a href="https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug" target="_blank" rel="nofollow noopener">PHP Debug</a>

## PHP
`index.php`を用意
```php:index.php
<?php
declare(strict_types=1);
 
for ($i = 1; $i <= 100; $i++) {
    if ($i % 15 === 0) {
        echo 'FizzBuzz';
    } elseif ($i % 3 === 0) {
        echo 'Fizz';
    } elseif ($i % 5 === 0) {
        echo 'Buzz';
    } else {
        echo $i;
    }
 
    echo PHP_EOL;
}
```

## デバッグの実行
1. `index.php` の行番号横をダブルクリックしてブレークポイントを設定
2. `docker-compose up -d` でDockerを起動
3. デバッグの実行（下記のいずれかの方法
    * `F5`
    * `Ctrl + Shift + d` → 再生ボタンを押して実行
    * メニューバー → 実行 → デバッグの開始
4. http://localhost:8080/ に接続

これでデバッグが開始されます。

## 参考
* <a href="https://zenn.dev/ikeo/articles/244d6a8042bcd8c55fe9" target="_blank" rel="nofollow noopener">【PHP】VScodeでXdebugを使ってデバッグする</a>
