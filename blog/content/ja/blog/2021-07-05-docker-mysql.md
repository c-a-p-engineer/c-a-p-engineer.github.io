---
title: "【Docker】Mysql が立ち上がらない（ユーザ設定エラー）"
date: 2021-07-05T04:00:00+09:00
description: "Docker で Mysql が立ち上がらない現象が発生したためメモ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
- Mysql
categories: 
- Docker
image: images/thumbnail/docker.png
---

# Mysql が立ち上がらない（パスワード設定エラー）
Docker で Mysql が立ち上がらなかったのでメモ。

## 現象
Docker で Mysql のコンテナ立ち上げ時にうまく立ち上がらなかったので `docker-compose logs` でログを確認
同じようなログ2種類を確認しました。

``` 
[ERROR] [Entrypoint]: MYSQL_USER="root", MYSQL_USER and MYSQL_PASSWORD are for 
configuring a regular user and cannot be used for 
the root user Remove MYSQL_USER="root" and use one of the following to control the root user password:
    - MYSQL_ROOT_PASSWORD
    - MYSQL_ALLOW_EMPTY_PASSWORD
    - MYSQL_RANDOM_ROOT_PASSWORD
```

``` 
[ERROR] [Entrypoint]: Database is uninitialized and password option is not specified
     You need to specify one of the following:
     - MYSQL_ROOT_PASSWORD
     - MYSQL_ALLOW_EMPTY_PASSWORD
     - MYSQL_RANDOM_ROOT_PASSWORD
```

## 原因
原因は `MYSQL_USER="root"` で `root` ユーザのパスワード設定は `MYSQL_PASSWORD` でするなとの事。
``` yml:docker-compose.yml
version: '3'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: test_db
      MYSQL_USER: root
      MYSQL_PASSWORD: passw0rd
```

## 対処
10行目の様に `root` ユーザ用のパスワードを追加。
12行目で 通常ユーザを設定します。
``` yml:docker-compose.yml {linenos=table, hl_lines=[10,12]}
version: '3'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: rootpw
      MYSQL_DATABASE: test_db
      MYSQL_USER: user
      MYSQL_PASSWORD: passw0rd
```

これで問題なく起動できました。