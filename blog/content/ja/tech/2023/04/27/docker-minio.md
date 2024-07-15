---
title: "【Docker】AWS S3 と互換性がある MiniO の環境を構築する方法"
date: 2023-04-27T21:30:00+09:00
description: "Docker でAWS S3 と互換性がある MiniO の環境を構築する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】AWS S3 と互換性がある MiniO の環境を構築する方法
この記事では、Docker Composeを使ってMiniOの環境を構築する方法を解説します。
MiniOは、オープンソースの分散オブジェクトストレージサーバーで、Amazon S3互換のAPIを提供しています。
これにより、簡単にオブジェクトストレージを構築ができます。

## Docker Composeファイルの作成
まず、`docker-compose.yml`という名前のファイルを作成し、以下の内容を記述します。

```yaml
version: '3.7'

services:
  minio:
    image: minio/minio:latest
    container_name: minio
    volumes:
      - ./data:/data
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio123
    command: server /data --address :9000 --console-address :9001
    ports:
      - "9000:9000"
      - "9001:9001"
```

この設定では、<a href="https://hub.docker.com/r/minio/minio" target="_blank" rel="nofollow noopener">Docker Hub - MiniOイメージ</a>を使用し、最新版を指定しています。
また、環境変数に`MINIO_ROOT_USER`と`MINIO_ROOT_PASSWORD`を設定しています。
これらはMiniOの管理者アカウントとパスワードです。適切な値に変更してください。

## MiniOコンテナを起動する
ターミナルで以下のコマンドを実行して、MiniOコンテナを起動します。
```bash
$ docker-compose up -d
```

これにより、MiniOコンテナが起動し、9000, 9001番ポートでアクセスできるようになります。
9000番のポートはAPI、9001番のポートはブラウザからアクセスするためのダッシュボード用になります。

## MiniOにアクセスする

ブラウザで <a href="http://localhost:9001" target="_blank" rel="nofollow noopener">http://localhost:9001</a> にアクセスし、先ほど設定した管理者アカウントとパスワードでログインしてください。
これで、MiniOのダッシュボードが表示されます。

## まとめ

この記事では、Docker Composeを使って簡単にMiniOの環境を構築する方法を紹介しました。
これにより、オブジェクトストレージを手軽に試すことができます。

## 参考
* <a href="https://docs.min.io/" target="_blank" rel="nofollow noopener">MiniO公式ドキュメント</a>
* <a href="https://hub.docker.com/r/minio/minio" target="_blank" rel="nofollow noopener">Docker Hub - MiniOイメージ</a>
