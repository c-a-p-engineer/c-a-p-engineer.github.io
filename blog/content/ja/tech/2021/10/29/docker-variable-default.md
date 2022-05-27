---
title: "【Docker】docker-compose の環境変数にデフォルト値を設定する方法"
date: 2021-10-29T09:00:00+09:00
description: "docker-compose の環境変数にデフォルト値を設定する方法。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】docker-compose の環境変数にデフォルト値を設定する方法
docker-compose の環境変数にデフォルト値を設定する方法のメモ。

## デフォルト値の設定方法

### 通常
通常 `.env` から取得して環境変数を使用する方法
``` yml:docker-compose.yml
version: '3'
services: 
    python:
        image:"python:${PYTHON_VERSION}" 
```

### デフォルト値を設定
`.env` に `PYTHON_VERSION` が設定されていない、もしくは空の時 Python3 のイメージを持ってくる設定。
``` yml:docker-compose.yml
version: '3'
services: 
    python:
        image:"python:${PYTHON_VERSION:-3}" 
```

* `${VARIABLE:-default}` VARIABLE が未設定、もしくは empty であれば default を設定する。
* `${VARIABLE-default}` VARIABLE が未設定であれば default を設定する。


### エラーの設定
変数が設定されていない場合にエラーを出す事も出来ます。
``` yml:docker-compose.yml
version: '3'
services: 
    python:
        image:"python:${PYTHON_VERSION:?err}" 
```

* `${VARIABLE:?err}` VARIABLE が未設定 、もしくはemptyであればdefaultを設定する。
* `${VARIABLE?err}` VARIABLE が未設定 、defaultを設定する。


## 参考
* <a href="https://docs.docker.com/compose/environment-variables/" target="_blank" rel="nofollow noopener">Environment variables in Compose | Docker Documentation</a>