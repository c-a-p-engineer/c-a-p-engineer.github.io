---
title: "【Docker】Amazon Cognitoをローカルでエミュレートできる「cognito-local」を使ってみよう"
date: 2025-01-10T10:00:00+09:00
description: "Amazon Cognitoは、ユーザー認証やデータ管理をクラウドでサポートするための大変便利なサービスですが、利用にはAWSアカウントやインターネット接続が必要です。これはローカルで開発を行う人にとって不便な場合もあります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】Amazon Cognitoをローカルでエミュレートできる「cognito-local」を使ってみよう

Amazon Cognitoは、ユーザー認証やデータ管理をクラウドでサポートするための大変便利なサービスですが、利用にはAWSアカウントやインターネット接続が必要です。これはローカルで開発を行う人にとって不便な場合もあります。

こんな問題を解決してくれるのが、ローカルデバッグに便利な「cognito-local」です。今回はこのツールについて解説し、そのインストール方法や使い方を簡単に紹介します。

---

## cognito-localとは

cognito-localは、Amazon Cognitoの機能をローカル環境でエミュレートするためのツールです。これにより、インターネット接続なしでも、ユーザー認証やユーザープールの管理などの機能をローカルで開発したりテストしたりできるようになります。

### 主な機能

- **ユーザープールの作成と管理**
  - ローカルでユーザープールを作成し、ユーザーの追加や削除、属性の更新が可能
- **認証フローのエミュレーション**
  - サインアップ、サインイン、パスワード変更などがテスト可能
- **Lambdaトリガーのサポート**
  - カスタム認証やユーザー属性の検証をテストできる

---

## インストール方法

cognito-localはDockerまたはNode.js系のプロジェクトとして使用できます。ここではいずれのセットアップ方法を簡単に解説します。

### Dockerを使用する場合

Dockerを使用してcognito-localを起動するには、以下のコマンドを実行するだけです。

```bash
docker run --publish 9229:9229 jagregory/cognito-local:latest
```

該当コマンドでcognito-localがポート、9229で起動します。データを永続化するためには、Dockerボリュームをマウントします。

### Node.jsを使用する場合

Node.js環境では、次のように設定します。

```bash
npm install --save-dev cognito-local
npx cognito-local
```

これにより、cognito-localがデフォルトのポート、9229で起動します。

---

## 制限事項

cognito-localはAmazon Cognitoのすべての機能をエミュレートするわけではありません。一部のAPIや機能は未サポートまたは部分的なサポートにとどまります。ため、正確な機能が必要な場合は、AWS本番環境での検証を必ず行いましょう。

---

## UserPoolの作成

このコマンドを使用することでUserPoolを作成することが可能です。

```bash
aws --endpoint http://localhost:9229 cognito-idp create-user-pool --pool-name MyUserPool
```

## おわりに

cognito-localは、ローカルでAmazon Cognitoの機能をすばやく検証するための助けとなるツールです。DockerやNode.jsを使えば、簡単にセットアップできるので、ぜひ試してみてください。

他にもCognito互換のソフトウェアがあります。
- <a href="https://github.com/frouriojs/magnito" target="_blank" rel="nofollow noopener">frouriojs/magnito 公式リポジトリ</a>

LocalStackは現在 Pro（有料）になります。
- <a href="https://docs.localstack.cloud/user-guide/aws/cognito/" target="_blank" rel="nofollow noopener">LocalStack / Cognito</a>

## 参考

リポジトリや関連資料は下記のURLを参考してください。

- <a href="https://github.com/jagregory/cognito-local" target="_blank" rel="nofollow noopener">cognito-local 公式リポジトリ</a>
- <a href="https://qiita.com/takapg/items/f753349d675cf0deb5ad" target="_blank" rel="nofollow noopener">Qiita: cognito-localのローカルテスト方法</a>
