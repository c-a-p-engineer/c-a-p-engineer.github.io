---
title: 【Docker】LocalStackでAWS Secrets Managerを使用、初期設定のメモ
date: 2024-07-11T03:30:00+09:00
description: Dockerを使用してLocalStackを設定し、起動時にJSONファイルからシークレットを読み込んでAWS Secrets Managerに設定するシェルスクリプトを紹介します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】LocalStackでAWS Secrets Managerを使用、初期設定のメモ
Dockerを使用してLocalStackを設定し、起動時にJSONファイルからシークレットを読み込んでAWS Secrets Managerに設定するシェルスクリプトを紹介します。

LocalStackはAWSクラウドのスタブをローカルで実行できるツールで、開発およびテスト環境に最適です。また、AWS CLIを使用してシークレットの設定と確認を行うコマンドも紹介します。

## Docker Composeファイルの作成

まず、LocalStackを設定するための`docker-compose.yml`ファイルを作成します。このファイルでは、LocalStackサービスを定義し、必要な環境変数を設定します。

```yaml
version: '3.8'

services:
  localstack:
    image: localstack/localstack
    ports:
      # シークレットマネージャー用ポート
      - "4566:4566"
    environment:
      # 使用サービス（シークレットマネージャー
      - SERVICES=secretsmanager
      # AWS 設定値
      - AWS_ACCESS_KEY_ID=dummy
      - AWS_SECRET_ACCESS_KEY=dummy
      - AWS_DEFAULT_REGION=us-east-1
      - AWS_DEFAULT_OUTPUT=json
    volumes:
      # localstack データを永続化
      - ../.data/localstack:/var/lib/localstack
      # localstack hook
      # https://docs.localstack.cloud/references/init-hooks/
      - ./localstack:/etc/localstack/init
```

## hook

初期化スクリプトの前にhookの設定ディレクトリの説明です。
コンテナ側のディレクトリにシェルスクリプトもしくはPythonを配置することで各タイミングで実行してくれるとのことです。

```
/etc
└── localstack
    └── init
        ├── boot.d           <-- コンテナ実行時（LocalStack開始前
        ├── ready.d          <-- LocalStack リクエスト準備完了
        ├── shutdown.d       <-- LocalStack シャットダウン時
        └── start.d          <-- Python プロセスが実行中、LocalStack開始
```

## 初期化シェルスクリプトの作成

次に、LocalStack起動時に実行される初期化スクリプトを作成します。このスクリプトは、JSONファイルからシークレットを読み込み、AWS Secrets Managerに登録します。

### /etc/localstack/init/start.d/init_secrets.sh

```bash
#!/bin/bash

echo 'START INIT SECRET!!'

# Install jq
apt-get update && apt-get install -y jq

# Wait for LocalStack to be ready
until curl -s http://localhost:4566/health | jq -e '.services.secretsmanager == "running"' > /dev/null; do
  echo "Waiting for LocalStack to be ready..."
  sleep 5
done

# Get the current directory
CURRENT_DIR=$(dirname "$0")

# Load JSON configuration file
CONFIG_FILE="${CURRENT_DIR}/config.json"
CONFIG_CONTENT=$(cat $CONFIG_FILE)

# Iterate over keys and create secrets
for key in $(echo "${CONFIG_CONTENT}" | jq -r 'keys[]'); do
    value=$(echo "${CONFIG_CONTENT}" | jq -r ".${key}")
    
    # Check if the value is an array or an object
    if echo "${value}" | jq -e 'type == "array" or type == "object"' > /dev/null; then
        # JSON format: no double quotes
        echo "key:${key}"
        echo "value:${value}"
        aws --endpoint-url=http://localhost:4566 secretsmanager create-secret --name "${key}" --secret-string "${value}"
    else
        # String format: add double quotes
        echo "key:${key}"
        echo "value:${value}"
        aws --endpoint-url=http://localhost:4566 secretsmanager create-secret --name "${key}" --secret-string "\"${value}\""
    fi
done


echo 'END INIT SECRET!!'
exit 0
```

## JSON設定ファイルの準備

初期化スクリプトが読み込むJSON設定ファイルを作成します。このファイルには、登録したいシークレットを定義します。

### /etc/localstack/init/start.d/config.json

シェルと同一の場所に配置します。

最上位の名前 `MySecretKey1` がシークレット名になるようにしています。

```json
{
    "MySecretKey1": "MySecretValue1",
    "MySecretKey2": "MySecretValue2",
    "MySecretKey3": {
        "username": "myuser",
        "password": "mypassword"
    }
}
```

## コンテナの起動とシークレットの初期化

すべてのファイルを準備したら、以下のコマンドを実行してDocker Composeを使用してコンテナを起動します。LocalStackが起動し、初期化スクリプトが実行されてシークレットが設定されます。

```bash
docker-compose up
```

## AWS CLIでのシークレットの設定と確認

シークレットが正しく設定されていることを確認するために、AWS CLIを使用してシークレットのリストと詳細を取得するコマンドを実行します。

### シークレットのリストを取得

以下のコマンドを実行して、登録されているすべてのシークレットのリストを取得します。

```bash
aws --endpoint-url=http://localhost:4566 secretsmanager list-secrets
```

### シークレットの詳細を取得

特定のシークレットの詳細を確認するために、シークレット名を指定して以下のコマンドを実行します。

```bash
aws --endpoint-url=http://localhost:4566 secretsmanager describe-secret --secret-id MySecretKey1
```

### シークレットの値を取得

シークレットの値を取得するには、以下のコマンドを実行します。

```bash
aws --endpoint-url=http://localhost:4566 secretsmanager get-secret-value --secret-id MySecretKey1
```

これで、LocalStack上のAWS Secrets Managerにシークレットが設定されていることを確認できます。

## 参考

- <a href="https://localstack.cloud/" target="_blank" rel="nofollow noopener">LocalStack公式サイト</a>
- <a href="https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/index.html" target="_blank" rel="nofollow noopener">AWS CLI ドキュメント</a>
- <a href="https://docs.docker.com/compose/" target="_blank" rel="nofollow noopener">Docker Compose ドキュメント</a>
- <a href="https://docs.localstack.cloud/references/init-hooks/" target="_blank" rel="nofollow noopener">LocalStack Init Hooks ドキュメント</a>
