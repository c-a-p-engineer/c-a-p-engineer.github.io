---
title: "【Docker】Elixir Phoenix の環境を作る"
date: 2022-12-27T01:40:00+09:00
description: "Docker で Elixir Phoenix の環境を作る"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
- Elixir
- Phoenix
categories: 
- Docker
image: images/thumbnail/docker.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Docker】Elixir Phoenix の環境を作る
Docker で Elixir Phoenix の環境を作る

## 作成する環境
* Elixir 1.14.2
* Phoenix 1.6.3

## Docker Compose ファイル作成
`docker-compose.yml` を用意します。
作るのは Elixir Phoenix の環境です。
Postgresも入っています。

```yaml:docker-compose.yml
version: '3.2'
services:
  elixir-phoenix:
    build:
        context: .
        dockerfile: ./Dockerfile
    ports:
      - '4000:4000'
    # command: mix phx.server
    tty: true
    environment:
      - MIX_ENV=dev
      - PORT=4000
    volumes:
      - ../:/app
    working_dir: /app/src

  db:
    image: postgres
    volumes:
      - .data/postgres:/var/lib/postgresql/data/pgdata
    environment:
      - PGDATA=/var/lib/postgresql/data/pgdata
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_HOST=db
```

## DockerFileの用意
今回構築するElixirのバージョンは `1.14.2` ですが他のバージョンを使用する場合は <a href="https://hub.docker.com/_/elixir" target="_blank" rel="nofollow noopener">elixir - Official Image - Docker Hub</a> を見て指定してください。

```Dockerfile
FROM elixir:1.14.2

RUN mix local.hex --force && \
  mix archive.install hex phx_new 1.6.3 --force && \
  mix local.rebar --force

WORKDIR /app/src
```

## Phoenix 環境を構築する

* Elixir Dockerコンテナに入る
```
docker-compose up -d
docker-compose run elixir-phoenix bash
```

* Phoenixプロジェクトを作成
```
mix phx.new . --app my_app
```

* DB設定変更
```src\config\dev.exs
# Configure your database
config :my_app, MyApp.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "my_app_dev",
  hostname: "db",
  pool_size: 10
```

* ホストから繋ぐためにIP設定を変更
```src\config\dev.exs
http: [ip: {0, 0, 0, 0}, port: 4000],
```

* 依存関係コンパイル & DB作成 & マイグレーション実行
```
mix deps.compile && mix ecto.create && mix ecto.migrate
```

* サーバー起動
```
mix phx.server
```

<a href="http://localhost:4000" target="_blank" rel="nofollow noopener">http://localhost:4000</a> に接続してWelcomeページが出たら成功です。
![phoenix](/tech/2022/12/27/docker-elixir-phoenix/phoenix.png "phoenix") 

* プロジェクト作成後に `docker-compose.yml` のコメントアウトを外すと起動時に自動的にサーバーが起動する設定にできます。
```yml:docker-compose.yml
    command: mix phx.server
```

## 参考
* <a href="https://qiita.com/Tsuyoshi84/items/336f31f6dcc2cd8a077b" target="_blank" rel="nofollow noopener">Docker ComposeでElixir/Phoenixの開発環境を構築する - Qiita</a>
