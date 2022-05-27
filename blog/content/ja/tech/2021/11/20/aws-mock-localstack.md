---
title: "【Docker】ローカル環境で AWS サービスのモックが使える 【Localstack】"
date: 2021-11-20T14:30:00+09:00
description: "Dockerでローカル環境で気軽にAWSサービスを使用できるモック環境の「Localstack」のご紹介"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】ローカル環境で AWS サービスのモックが使える 【Localstack】
S3やSQSなどのAWSのテストや検証を行いたい時に一々AWS環境に用意するのも面倒。
そんな時に使えるDockerでローカル環境で気軽にAWSサービスを使用できるモック環境の「Localstack」のご紹介。

## Docker環境構築
以下のリポジトリにファイルがございます。
* <a href="https://github.com/c-a-p-engineer/docker-aws-mock" target="_blank" rel="nofollow noopener">Docker AWS Mock</a>

``` yml:docker-compose.yml
version: '3'

services:
  localstack:
    container_name: localstack
    image: localstack/localstack:latest
    ports:
      - "4566:4566"
      - "4571:4571"
    environment:
      - SERVICES=${SERVICES- }
      - DEBUG=${DEBUG- }
      - DATA_DIR=${DATA_DIR- }
      - LAMBDA_EXECUTOR=${LAMBDA_EXECUTOR- }
      - HOST_TMP_FOLDER=${TMPDIR:-/tmp/}localstack
      - DOCKER_HOST=unix:///var/run/docker.sock
    volumes:
      - "${TMPDIR:-/tmp/localstack}:/tmp/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"

  # AWS CLI
  aws-cli:
    container_name: aws-cli
    image: amazon/aws-cli:latest
    environment:
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      AWS_DEFAULT_REGION: ${AWS_DEFAULT_REGION}
      AWS_DEFAULT_OUTPUT: ${AWS_DEFAULT_OUTPUT}
    entrypoint: "aws"
    command: "help"
    tty: true
```

```yml:.env..yml
###########################################################
###################### General Setup ######################
###########################################################

### Paths #################################################
# Choose storage path on your machine. For all storage systems
DATA_PATH_HOST=./data

# AWS Settings
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION=ap-northeast-1
AWS_DEFAULT_OUTPUT=json

# Localstack Servers
LOCALSTACK_SERVICES=s3
```
※ `LOCALSTACK_SERVICES` に使用したいサービスを記載してください。

### localstack で使用できるサービス
こちらに記載がありました。（2021/11/20 現時点
* <a href="https://hub.docker.com/r/localstack/localstack" target="_blank" rel="nofollow noopener">localstack - docker hub</a>

> * ACM
> * API Gateway
> * CloudFormation
> * CloudWatch
> * CloudWatch Logs
> * DynamoDB
> * DynamoDB Streams
> * EC2
> * Elasticsearch Service
> * EventBridge (CloudWatch Events)
> * Firehose
> * IAM
> * Kinesis
> * KMS
> * Lambda
> * Redshift
> * Route53
> * S3
> * SecretsManager
> * SES
> * SNS
> * SQS
> * SSM
> * StepFunctions
> * STS

使用する際は <a href="https://docs.aws.amazon.com/cli/latest/reference/#available-services" target="_blank" rel="nofollow noopener">AWS CLI Command</a> の値を使用するとのこと。
例えば `S3` を使用したい場合は `s3` となります。

## AWS コマンドを localstack に実行する
サンプルの `aws-cli` 環境に入ってやります。
※既に AWS CLI が入っているのであれば不要
```shell
docker exec -it aws-cli sh
```

`localstack` に向けて実行するため `--endpoint-url` が必要になります。
ホスト側から実行する場合は `localstack` → `localhost`にしてください。

試しに `localstack` に `S3` のバケットを作成。
```shell
aws --endpoint-url=http://localstack:4566 \
s3 mb s3://develop
```

作成できたら以下のコマンドで確認
```shell
aws --endpoint-url=http://localstack:4566 \
s3 ls
```

これでローカル環境でAWSの様々なサービスを試すことが出来ます。

## 参考
* <a href="https://github.com/localstack/localstack" target="_blank" rel="nofollow noopener">localstack - github</a>
* <a href="https://hub.docker.com/r/localstack/localstack" target="_blank" rel="nofollow noopener">localstack - docker hub</a>
