---
title: 【GitHub】GitHub Actionsを使用してPHP Webサーバーを起動する方法
date: 2023-11-03T20:30:00+09:00
description: GitHub Actionsを使用してPHP Webサーバーを起動し、その動作を確認する方法について説明します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# GitHub Actionsを使用してPHP Webサーバーを起動する方法

GitHub Actionsを使用してPHP Webサーバーを起動し、その動作を確認する方法について説明します。

## ワークフローファイルの設定

GitHub の Git リポジトリに`.github/workflows/php-server.yml` を作成してGitHub Actionsを設定します。

```yml:.github/workflows/php-server.yml
name: PHP Server Workflow

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    # リポジトリをチェックアウト
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    # PHP組み込みのWebサーバーをバックグラウンドで起動 起動するまで少し待つ
    - name: Start PHP server
      run: |
        php -S localhost:8000 & 
        sleep 5

    # localhostの8000ポートに対してHTTPリクエストを送信し、レスポンスを確認
    - name: Check server
      run: |
        curl http://localhost:8000

```

サーバーが起動していれば、デフォルトのPHPページまたはプロジェクトに設定されたルートページの内容を出力します。

これらの設定をGitHubリポジトリにプッシュすると、GitHub Actionsがトリガーされ、自動的にPHP Webサーバーが起動します。GitHubのActionsタブでワークフローの実行状況を確認できます。

## まとめ

GitHub Actionsを使用してPHP Webサーバーを起動する基本的な設定は完了です。この設定をカスタマイズして、PHPアプリケーションの自動テストやデプロイメントなど、さまざまなCI/CDタスクに応用ができます。
