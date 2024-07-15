---
title: "docker-compose で .env ファイルを使って環境ごとに設定を変える"
date: 2021-09-17T15:30:00+09:00
description: "docker-compose で .env ファイルを使って環境ごとに設定を変える方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# docker-compose で .env ファイルを使って環境ごとに設定を変える
docker-compose 構築時に環境ごとに設定を変えたいことがあります。
そういった時に `.env` ファイルに設定値を書き込んで読むようにする方法のメモ。

## .envファイルを作成
`.env` ファイルを `docker-compose.yml` と同じ階層に用意すると `docker-compose` 内で変数のように展開できます。

```yml:.env..yml
# バージョン指定
PYTHON_VERSION=2

# HOST側のコードパス
APP_CODE_PATH_HOST=../

# コンテナ側のコードパス
APP_CODE_PATH_CONTAINER=/var/www
```

## docker-compose.yml
`${設定名}` で `.env` に設定した値を展開することが出来ます。
`args` に `Dockerfile` に使用したい設定値を使用します。
```yml:docker-compose.yml
version: '3.8'
volumes:
  db-store:
services:
  python:
    container_name: python
    build:
      context: .
      dockerfile: ./python/Dockerfile
      args:
        - PYTHON_VERSION=${PYTHON_VERSION}
    volumes:
      - ${APP_CODE_PATH_HOST}:${APP_CODE_PATH_CONTAINER}
    working_dir: ${APP_CODE_PATH_CONTAINER}
    tty: true
```

## Dockerfile
`docker-compose.yml` で `args` に入れた `PYTHON_VERSION` を使用します。
```Dockerfile
# 値がない場合用にデフォルト値を設定
ARG PYTHON_VERSION=3

# 指定されたバージョンのイメージを取得
FROM python:${PYTHON_VERSION}
RUN apt-get update
```
