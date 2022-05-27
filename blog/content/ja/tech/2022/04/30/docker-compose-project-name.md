---
title: "【Docker】docker-compose でプロジェクト名を設定する"
date: 2022-04-30T01:30:00+09:00
description: "【Docker】docker-compose でプロジェクト名を設定する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】docker-compose でプロジェクト名を設定する
【Docker】docker-compose でプロジェクト名を設定する方法

## COMPOSE_PROJECT_NAME を設定する
`COMPOSE_PROJECT_NAME` を設定することで `[COMPOSE_PROJECT_NAME]_[container_name]` で作成されます。

### ターミナルで設定する
```
$ export COMPOSE_PROJECT_NAME=test && \
  docker-compose up -d
```
<a href="https://docs.docker.com/compose/reference/envvars/#compose_project_name" target="_blank" rel="nofollow noopener">Compose CLI environment variables | Docker Documentation#COMPOSE_PROJECT_NAME</a>

### .env で設定する
`docker-compose.yml` と同じ階層に `.env`ファイルで作成します。
```.env
COMPOSE_PROJECT_NAME=test
```

docker を起動。
```
$ docker-compose up -d
```

<a href="https://docs.docker.com/compose/env-file/#compose-file-and-cli-variables" target="_blank" rel="nofollow noopener">Compose CLI environment variables | Docker Documentation#Compose file and CLI variables</a>
