---
title: "【Docker】Dockerのパッケージ取得を高速化をする"
date: 2022-09-25T17:00:00+09:00
description: "Dockerのビルドの際に一番辛いのが各種パッケージの取得が遅い。そんなパッケージ取得を高速化をするメモ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】Dockerのパッケージ取得を高速化をする
Dockerのビルドの際に一番辛いのが各種パッケージの取得が遅い。そんなパッケージ取得を高速化をするメモ。

## 通常のDockerFile

```Dockerfile
FROM ubuntu:latest

RUN apt update && apt install -y \
     git \
     less \
     vim \
     curl \
     unzip \
     && apt-get clean && rm -rf /var/lib/apt/lists/*
```

上記のファイルでビルドに `166.4s` かかりました。

## apt のパッケージ取得先を日本のサーバーに変更
`apt` のパッケージ先を `archive.ubuntu.com` → `ftp.jaist.ac.jp/pub/Linux` に変換します。

```Dockerfile {linenos=table,hl_lines=["3"]}
FROM ubuntu:latest

RUN sed -i 's@archive.ubuntu.com@ftp.jaist.ac.jp/pub/Linux@g' /etc/apt/sources.list

RUN apt update && apt install -y \
     git \
     less \
     vim \
     curl \
     unzip \
     && apt-get clean && rm -rf /var/lib/apt/lists/*
```

`56.3s` でビルド完了。

## apt-fastを導入
`apt` の高速版、`apt-fast` を導入します。

```Dockerfile {linenos=table,hl_lines=["5-12"]}
FROM ubuntu:latest

RUN sed -i 's@archive.ubuntu.com@ftp.jaist.ac.jp/pub/Linux@g' /etc/apt/sources.list

# apt-fast
RUN apt-get update && apt-get install -y \
    software-properties-common && \
    rm -rf /var/lib/apt/lists/*
RUN add-apt-repository ppa:apt-fast/stable
RUN apt-get update && apt install -y \
    apt-fast \
    && apt-fast clean && rm -rf /var/lib/apt/lists/*

RUN apt-fast update && apt-fast install -y \
     git \
     less \
     vim \
     curl \
     unzip \
     && apt-fast clean && rm -rf /var/lib/apt/lists/*
```

`161.9s` でビルド完了。
`apt-fast` の導入に `105.4s` かかっています。
それ以外のビルド時間 `56.5s` なので実質そんな変化はありませんでした。

今回はサンプルが悪かったようでより多くの、複雑なパッケージを入れて試したら `apt-fast` を使用した場合 `780.0s` → `246.3s` と劇的に変化をしました。
なので構成次第の面があるかと思います。
