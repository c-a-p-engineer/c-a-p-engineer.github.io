---
title: "【AWS CLI】プロファイルを切り替えて使用する"
date: 2022-02-19T13:40:00+09:00
description: "複数のサービスなどに関わっている場合、AWSのアカウントを切り替える必要があったりするのでそのためのメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
categories: 
- AWS CLI
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS CLI】プロファイルを切り替えて使用する。
複数のサービスなどに関わっている場合、AWSのアカウントを切り替える必要があったりするのでそのためのメモ

## AWSのプロファイル設定
まずはAWSのプロファイルの設定を行います。
* Windows: `%USERPROFILE%\.aws\credentials`
* Linux or Mac: `~/.aws/credentials`

```.aws/credentials
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[user1]
aws_access_key_id=AKIAI44QH8DHBEXAMPLE
aws_secret_access_key=je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY
```

ちなみに僕の場合はプロファイルの設定をし忘れないようにあえて `default` は設定していません。

## プロファイルの切り替え

### コマンド実行時に都度指定
`--profile` で使用したいプロファイルを指定します。

```
aws configure list --profile user1
```

### 環境変数で切り替え
* Linux or Mac
```
export AWS_PROFILE=user1
```

* Windows
```
setx AWS_PROFILE user1
```

## 参考
* <a href="https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-profiles.html" target="_blank" rel="nofollow noopener">名前付きプロファイル - AWS Command Line Interface</a>
