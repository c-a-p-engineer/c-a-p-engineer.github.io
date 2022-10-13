---
title: "【Docker】Docker Compose で profiles を使って普段使わないサービスの起動をさせないようにする"
date: 2022-10-11T18:00:00+09:00
description: "Docker Compose で profiles を使って普段使わないサービスの起動をさせないようにする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】Docker Compose で profiles を使って普段使わないサービスの起動をさせないようにする
Docker Compose で `profiles` を使って普段使わないサービスの起動をさせないようにする方法

##  profiles を使用する。
Docker Compose の `profiles` というものを使用します。

### サンプル Docker Compose
サンプルとして以下の `docker-compose.yml` を使用します。
通常起動したくない `phpmyadmin` に `profiles` を指定します。

```yml:docker-compose.yml {linenos=table,hl_lines=[31]}
version: '3'

services: 
  php:
    image: php:8.1.11-apache
    volumes:
      - ./src:/var/www/
    working_dir: /var/www
  mysql:
    container_name: mysql
    image: mysql:8.0
    command:
      - --sql-mode=NO_ENGINE_SUBSTITUTION
    volumes:
      - ./.data/mysql:/var/lib/mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: test
      MYSQL_USER: develop
      MYSQL_PASSWORD: p@ssw0rd
      TZ: 'Asia/Tokyo'
  phpmyadmin:
    container_name: phpmyadmin
    image: phpmyadmin/phpmyadmin:latest
    environment:
      PMA_HOST: 'mysql'
    ports:
      - 18888:80
    profiles: ["debug"]
```

`profiles: ["debug", "test"]` などのように `profiles` を複数指定することも可能です。

### 起動
これで通常起動してみると `phpmyadmin` のコンテナが立ち上がらなくなります。
```
docker-compose up
```

以下のように `--profile [プロファイル名]` を指定して立ち上げると `phpmyadmin` のコンテナが立ち上がります。
```
docker-compose --profile debug up
```

### 補足
たとえば特定のサービスのみを起動したい場合は以下のようにサービスを指定することで特定のみを起動することも可能です。

`php` のみ起動
```
docker-compose up php
```

`php` と `mysql` が起動
```
docker-compose up php mysql
```

## 参考
* <a href="https://docs.docker.jp/compose/profiles.html" target="_blank" rel="nofollow noopener">Compose で プロフィール(profile) を使う - Docker-docs-ja 20.10 ドキュメント</a>
