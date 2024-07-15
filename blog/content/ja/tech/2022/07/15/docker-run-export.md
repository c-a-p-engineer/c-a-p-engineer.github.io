---
title: "【Docker】Dockerfile で環境変数は RUN export では設定できない"
date: 2022-07-15T08:00:00+09:00
description: "Dockerfileで環境変数は RUN export では設定できない"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】Dockerfile で環境変数は RUN export では設定できない
Dockerfileで環境変数は `RUN export` では設定できない

## 現象
Docker構築時に環境変数を設定する際、`RUN export` で環境変数を行っても反映されない

## 失敗例
以下の方法では `GO111MODULE` を環境変数に設定しても反映されませんでした。

```yml:Dockerfile
FROM golang:latest

RUN export GO111MODULE=on
```

## 成功例
`RUN export` → `ENV` に変更することで環境変数の設定ができました。

```Dockerfile
FROM golang:latest

ENV GO111MODULE on
```

`ENV {key} {value}` で設定されます。

### 補足
補足としては `$PATH` を値に入れて既存の環境変数を入れることができます。
```Dockerfile
FROM golang:latest

ENV GOPATH $HOME/go
ENV PATH $PATH:$GOPATH/bin
```

## 参考
* <a href="https://docs.docker.jp/engine/reference/builder.html?highlight=env#env" target="_blank" rel="nofollow noopener">Dockerfile リファレンス#ENV</a>