---
title: "【GitHub】GitHub Actions で Docker を使う"
date: 2021-10-09T18:00:00+09:00
description: "GitHub Actions で Docker を使ってみます"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
- Docker
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# GitHub Actions Dockerを使う
`GitHub Actions` で自分が構築したDockerを使ってテストなどをする方法。

## Dokcer を使う
CentOS の Image を `pull` してバージョンを出力するだけ

``` yml:.github/workflows/docker.yml
name: Docker

on:
  push:
    branches:
      - master

jobs:
  deploy:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      # Docker Set Up
      - name: Docker Set Up
        run: |
          docker pull centos

      # Docker Exec
      - name: Docker Exec
        run: |
          docker run centos sh -c "cat /etc/redhat-release"
```

## Docker Compose を使う
Docker で環境を作る際は Docker Compose で設定していることが多いと思いますので実際には使用する際にはこちらの方がメインになると思います。

### Docker Compose の用意
サンプルなのでCentOS の Image を作るだけ。

``` yml:docker-compose.yml
version: '3'

services:
  centos:
    image: centos
    container_name: centos
    tty: true
```

### GitHub Actions で Docker Compose

別途Dockerとソースファイルが別れている場合があると思いますが今回はそのパターンを割愛しています。

``` yml:.github/workflows/docker.yml
name: Docker Compose

on:
  push:
    branches:
      - master

jobs:
  deploy:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      # Checkout
      - name: Checkout
        uses: actions/checkout@v2
        with:
          submodules: true
          fetch-depth: 0

      # Docker Set Up
      - name: Docker Set Up
        run: |
          docker-compose up -d --build

      # CentOS Version
      - name: CentOS Version
        run: |
          docker-compose exec -T centos sh -c "cat /etc/redhat-release"

```