---
title: "【Docker】指定のバージョンのGitをインストールする方法"
date: 2024-07-18T01:40:00+09:00
description: "Dockerにインストールされるgitのバージョンが古かったので指定のバージョンのGitをインストールする方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】指定のバージョンのGitをインストールする方法

Dockerにインストールされるgitのバージョンが古かったので指定のバージョンのGitをインストールする方法メモ。

脆弱性対策のために普通にインストールするだけでは脆弱性があるバージョンだったためで指定のバージョンを入れる必要があったため記録。

## Dockerfile

Dockerfileを作成します。

```dockerfile
# ベースイメージを指定
FROM ubuntu:20.04

# 必要なパッケージをインストール
RUN apt-get update && \
    apt-get install -y \
    wget \
    make \
    gcc \
    libssl-dev \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext

# 環境変数としてGitのバージョンを指定
ARG GIT_VERSION=2.30.0

# Gitの指定バージョンをダウンロード、コンパイル、インストール
RUN wget https://github.com/git/git/archive/v${GIT_VERSION}.tar.gz \
    && tar -xzf v${GIT_VERSION}.tar.gz \
    && cd git-${GIT_VERSION} \
    && make prefix=/usr/local all \
    && make prefix=/usr/local install

# Gitのバージョンを確認
RUN git --version
```

`GIT_VERSION` に指定する値は <a href="https://github.com/git/git/tags" target="_blank" rel="nofollow noopener">Git Tags</a> から確認してください。

これでgitの指定のバージョンがインストールされます。
