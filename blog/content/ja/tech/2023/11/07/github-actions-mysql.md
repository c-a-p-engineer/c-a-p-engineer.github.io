---
title: 【GitHub】GitHub Actions MySQL データベースを利用する
date: 2023-11-07T07:30:00+09:00
description: GitHub Actionsを使用して MySQL データベースをセットアップし、接続テストを行う手順をご紹介します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions MySQL データベースを利用する

GitHub Actionsを使用して MySQL データベースをセットアップし、接続テストを行う手順をご紹介します。

GitHub Actionsは、ソフトウェアワークフローを自動化するためのCI/CDツールです。MySQLのセットアップと接続テストを自動化する方法を学びましょう。

## YAMLファイルの内容と説明

```yaml:.github/workflows/mysql.yml
name: MySQL Workflow
on: [push] # GitHubにプッシュされた時に実行される

jobs:
  setup-mysql:
    runs-on: ubuntu-latest # Ubuntu最新版で実行
    services:
      mysql:
        image: mysql:8.0 # MySQLのバージョン8.0のDockerイメージを使用
        env:
          MYSQL_ROOT_PASSWORD: root_password # ルートユーザーのパスワード
          MYSQL_DATABASE: foo # 作成するデータベース名
          MYSQL_USER: user # ユーザー名
          MYSQL_PASSWORD: user_password # ユーザーのパスワード
        ports:
          - 3306:3306 # ポートマッピング設定
        options: >- # コンテナのヘルスチェック設定
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=10s
          --health-retries=10
    steps:
      - name: Show Docker containers # 実行中のDockerコンテナを表示
        run: docker ps -a

      - name: Show databases for user # ユーザーのデータベースを表示
        run: mysql --protocol=tcp -h localhost -P 3306 -u user -puser_password -e "SHOW DATABASES"
```

### 説明

- **トリガー**: `on: [push]` は、このWorkflowがGitHubへのプッシュ時にトリガーされることを意味します。
- **ジョブ設定**: `setup-mysql` ジョブは `ubuntu-latest` で実行され、MySQLサービスをセットアップします。
- **サービス設定**: MySQLサービスは、Dockerイメージ `mysql:8.0` を使用して設定されます。
- **環境変数**: `env` セクションでは、データベースのユーザー、パスワード、データベース名を設定します。
- **ポート設定**: `3306:3306` でMySQLのデフォルトポートをホストマシンに公開します。
- **ヘルスチェック**: `options` でコンテナの起動と健全性を確認するためのコマンドを設定します。
- **ステップ**: 
   - `Show Docker containers` ステップで現在実行中のDockerコンテナの一覧を表示します。
   - `Show databases for user` ステップで、指定したユーザーで利用可能なデータベースの一覧を表示します。

### 実行と確認

このファイルをコミットし、GitHubにプッシュすると、自動的にGitHub Actionsがトリガーされます。完了後、「Actions」タブで実行結果を確認できます。成功していれば、指定されたユーザーでデータベースに接続し、利用可能なデータベースの一覧を表示することができます。

### 参考リンク

- GitHub Actionsの公式ドキュメント: <a href="https://docs.github.com/ja/actions" target="_blank" rel="nofollow noopener">GitHub Actions Documentation</a>
- MySQLのDockerイメージ: <a href="https://hub.docker.com/_/mysql" target="_blank" rel="nofollow noopener">MySQL Docker Hub</a>
