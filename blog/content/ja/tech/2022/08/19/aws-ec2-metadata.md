---
title: "【AWS】EC2 インスタンスの情報を取得する方法"
date: 2022-08-19T07:00:00+09:00
description: "EC2 のインスタンスに入っている時に簡単にインスタンス情報を取得する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
- AWS EC2
categories: 
- AWS EC2
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS】EC2 インスタンスの情報を取得する方法
EC2のインスタンスに入っている時に簡単にインスタンス情報を取得する方法。
インスタンスにログインしていてインスタンス情報を確認する時に有用です。
今まで一々AWSの画面を確認していました…

* <a href="https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html" target="_blank" rel="nofollow noopener">インスタンスメタデータの取得 - Amazon Elastic Compute Cloud</a>

## インスタンスIDを取得
サンプルとしてインスタンスIDの取得方法。
```
$ curl 169.254.169.254/latest/meta-data/instance-id/
i-XXXXXXXX
```

## 各種データの取得
他に確認できる一覧項目です。

各種値の説明はこちら
* <a href="https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/instancedata-data-categories.html" target="_blank" rel="nofollow noopener">インスタンスメタデータのカテゴリ - Amazon Elastic Compute Cloud</a>

```
$ curl http://169.254.169.254/latest/meta-data/
ami-id
ami-launch-index
ami-manifest-path
block-device-mapping/
events/
hostname
iam/
instance-action
instance-id
instance-type
local-hostname
local-ipv4
mac
metrics/
network/
placement/
profile
public-hostname
public-ipv4
public-keys/
reservation-id
security-groups
services/
```

## 参考
* <a href="https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html" target="_blank" rel="nofollow noopener">インスタンスメタデータの取得 - Amazon Elastic Compute Cloud</a>
* <a href="https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/instancedata-data-categories.html" target="_blank" rel="nofollow noopener">インスタンスメタデータのカテゴリ - Amazon Elastic Compute Cloud</a>

