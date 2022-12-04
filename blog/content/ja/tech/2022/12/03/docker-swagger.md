---
title: "【Docker】Swagger環境を構築する"
date: 2022-12-03T02:00:00+09:00
description: "Docker で Swagger環境を構築するメモ。"
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

# 【Docker】Swagger環境を構築する
Docker で Swagger環境を構築するメモ

## docker-compose.yml 作成
```yml:docker-compose.yml
version: '3.0'

services:
  swagger-editor:
    image: swaggerapi/swagger-editor
    container_name: "swagger-editor"
    ports:
      - "8001:8080"

  swagger-ui:
    image: swaggerapi/swagger-ui
    container_name: "swagger-ui"
    ports:
      - "8002:8080"
    volumes:
      - ./api/openapi.yaml:/openapi.yaml # Swagger File
    environment:
      SWAGGER_JSON: /openapi.yaml # Swagger File

  swagger-api:
    image: stoplight/prism:latest
    container_name: "swagger-api"
    ports:
      - "8003:4010"
    command: mock -h 0.0.0.0 /openapi.yaml # Swagger File
    volumes:
      - ./api/openapi.yaml:/openapi.yaml # Swagger File
```

## Sample yaml作成
```yaml:openapi.yaml
openapi: "3.0.3"

info:
  title: "Test1-API"
  version: "1.0.0"

paths:
  "/helloWorld":
    get:
      responses:
        "200":
          description: "test-ok"
          content:
            application/json:
              schema:
                type: string
                example: "Hello World"
```

## 起動
Dockerを起動します。
```
docker-compose up -d
```

起動したら以下のURLで確認。
|Swagger|URL|
|:----|:----|
|Swagger Editor|<a href="http://localhost:8001/" target="_blank" rel="nofollow noopener">http://localhost:8001/</a>|
|Swagger UI|<a href="http://localhost:8002/" target="_blank" rel="nofollow noopener">http://localhost:8002/</a>|
|Swagger API mock|<a href="http://localhost:8003/" target="_blank" rel="nofollow noopener">http://localhost:8003/</a>|

これでSwaggerの環境を作成できました。
