---
title: "【AWS CLI】CloudWatchLogs を操作する"
date: 2022-01-22T18:00:00+09:00
description: "AWS CLI で CloudWatchLogs を操作するメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
- AWS CloudWatch Logs
categories: 
- AWS CLI
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS CLI】CloudWatchLogs を操作する
`AWS CLI` で `CloudWatchLogs` を操作するメモ

## コマンド
すべては紹介していないので足りない場合は公式を見てください。
<a href="https://docs.aws.amazon.com/cli/latest/reference/logs/index.html" target="_blank" rel="nofollow noopener">logs — AWS CLI 1.22.41 Command Reference</a>

もし`localstack` を使用して確認したい場合は `--endpoint-url http://localstack:4566 \` とエンドポイントを指定すると向き先の変更ができます。
`CloudWatchLogs` に対する操作ができない場合は権限などを疑ってみてください。

### ロググループの作成
```shell
aws logs \
create-log-group \
--log-group-name TestLogGroup \
--region ap-northeast-1 
```

### ログストリームの作成
```shell
aws logs \
create-log-stream \
--log-group-name TestLogGroup \
--log-stream-name TestLogStream \
--region ap-northeast-1
```

### ログ送信
```shell
aws logs put-log-events \
--log-group-name TestLogGroup \
--log-stream-name TestLogStream \
--log-events \
timestamp=1461997171845,message="test log message from AWS CLI"
```

### ロググループ確認
```shell
aws logs describe-log-streams \
--log-group-name TestLogGroup
```

### ログをリアルタイムで確認する
```shell
aws logs tail \
--follow \
TestLogGroup
```

## 参考
* <a href="https://docs.aws.amazon.com/cli/latest/reference/logs/index.html" target="_blank" rel="nofollow noopener">logs — AWS CLI 1.22.41 Command Reference</a>
* <a href="https://dev.classmethod.jp/articles/operate-cloudwatch-log-group-using-cli-for-beginners/" target="_blank" rel="nofollow noopener">AWS CLIを使用してCloudWatchLogsを操作してみる | DevelopersIO</a>
