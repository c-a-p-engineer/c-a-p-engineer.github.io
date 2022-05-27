---
title: "【Docker】tty:true にしても落ちてしまう時の対処"
date: 2022-04-06T07:50:00+09:00
description: "Docker で tty:true にしても落ちてしまう時の対処メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】tty:true にしても落ちてしまう時の対処
Docker で `tty: true` にしても落ちてしまう時の対処メモ

## 現象
下記のような `docker-compose.yml` で `tty: true` にして `command` を設定していると起動後に `exit` してしまいます。

```yml:docker-compose.yml
version: '3'

services:
  ubuntu:
    image: ubuntu:latest
    tty: true
    command: >
      /bin/bash -c "
        pwd
      "
```

## 対処方法
`command` の最後に `/bin/bash` を追加して `bash` を対話モードで動かし続けるようにします。
こうすることによって裏で `bash` が動いているのでコンテナが落ちないようになります。

```yml:docker-compose.yml
version: '3'

services:
  ubuntu:
    image: ubuntu:latest
    tty: true
    command: >
      /bin/bash -c "
        pwd
        /bin/bash
      "
```

## 参考
<a href="https://ja.stackoverflow.com/a/52138" target="_blank" rel="nofollow noopener">docker-compose up で tty: trueを付けているのに、commandを実行するとコンテナが終わってしまう - スタック・オーバーフロー</a>
