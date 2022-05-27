---
title: "【AWS Lambda Python】Postgresを利用する方法"
date: 2021-12-04T02:00:00+09:00
description: "AWS Lambda上の Python で psycopg2 を利用することが出来ません。そのため、AWS Lambda用の psycopg2 を入れる必要があります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
- AWS Lambda
- Python
categories: 
- AWS Lambda
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS Lambda Python】Postgresを利用する方法
AWS Lambda上で `psycopg2` を利用することが出来ません。
そのため、AWS Lambda用の `psycopg2` を入れる必要があります。

## 対応方法

### 1. ライブラリをダウンロード
こちらからダウンロード。
<a href="https://github.com/jkehler/awslambda-psycopg2.git" target="_blank" rel="nofollow noopener">psycopg2 Python Library for AWS Lambda</a>

もしくは `git clone` してください。
```shell
git clone https://github.com/jkehler/awslambda-psycopg2.git
```

### 2. 使用するバージョン
Pythonのバージョンに合わせて、ダウンロードしたディレクトリの `psycopg2-3.x` を Lambdaにデプロイするコードと同じディレクトリに配置。

### 3. ディレクトリ名変更
`psycopg2-3.x` → `psycopg2` に変更。

### 4. Lambdaにデプロイ
Lambdaに `psycopg2` のフォルダも合わせてデプロイしてください。

## 参考
* <a href="https://opqrstuvcut.github.io/blog/posts/aws%E3%81%AElambda%E3%81%8B%E3%82%89postgres%E3%82%92%E5%88%A9%E7%94%A8/" target="_blank" rel="nofollow noopener">AWSのLambdaからPostgresを利用</a>
