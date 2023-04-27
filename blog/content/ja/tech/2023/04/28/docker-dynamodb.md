---
title: "【Docker】DynamoDB 環境を作る方法"
date: 2023-04-28T00:30:00+09:00
description: "Docker でdynamodb-localとdynamo-adminを使用して DynamoDBの環境を作る"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Docker】DynamoDB 環境を作る方法
Docker でdynamodb-localとdynamo-adminを使用して DynamoDBの環境を作る。
この記事では、Docker Composeを使って、dynamodb-localとdynamo-adminの環境を構築する方法を解説します。
dynamodb-localは、AWS DynamoDBのローカル開発環境です。
dynamo-adminは、DynamoDBのデータを管理するためのWebアプリケーションです。

## Docker Composeファイルの作成
まず、`docker-compose.yml`という名前のファイルを作成し、以下の内容を記述します。

```yaml
version: '3.7'

services:
  dynamodb-local:
    image: amazon/dynamodb-local:latest
    container_name: dynamodb-local
    user: root
    command: -jar DynamoDBLocal.jar -sharedDb -dbPath /data
    volumes:
      - data/dynamodb:/data
    ports:
      - "8000:8000"

  dynamo-admin:
    image: aaronshaf/dynamodb-admin:latest
    container_name: dynamo-admin
    environment:
      DYNAMO_ENDPOINT: http://dynamodb-local:8000
    ports:
      - "8001:8001"
    depends_on:
      - dynamodb-local
```

この設定では、dynamodb-localのイメージは <a href="https://hub.docker.com/r/amazon/dynamodb-local" target="_blank" rel="nofollow noopener">amazon/dynamodb-local</a> を使用し、最新版を指定しています。
また、dynamo-adminのイメージは <a href="https://hub.docker.com/r/aaronshaf/dynamodb-admin" target="_blank" rel="nofollow noopener">aaronshaf/dynamodb-admin</a> を使用しています。

## コンテナを起動する

次に、ターミナルで以下のコマンドを実行して、dynamodb-localとdynamo-adminのコンテナを起動します。

```bash
$ docker-compose up -d
```

これにより、dynamodb-localが8000番ポート、dynamo-adminが8001番ポートでアクセスできるようになります。

## dynamo-adminにアクセスする

ブラウザで <a href="http://localhost:8001" target="_blank" rel="nofollow noopener">http://localhost:8001</a> にアクセスしてください。
これで、dynamo-adminの管理画面が表示されます。ここから、テーブルの作成やデータの操作が可能です。

## まとめ
この記事では、Docker Composeを使って簡単にdynamodb-localとdynamo-adminの環境を構築する方法を紹介しました。
これにより、DynamoDBの開発環境を手軽に試すことができます。

## 参考資料
* <a href="https://aws.amazon.com/jp/dynamodb/" target="_blank" rel="nofollow noopener">AWS DynamoDB公式ページ</a>
* <a href="https://hub.docker.com/r/amazon/dynamodb-local" target="_blank" rel="nofollow noopener">Docker Hub - amazon/dynamodb-local</a>
* <a href="https://hub.docker.com/r/aaronshaf/dynamodb-admin" target="_blank" rel="nofollow noopener">Docker Hub - aaronshaf/dynamodb-admin</a>