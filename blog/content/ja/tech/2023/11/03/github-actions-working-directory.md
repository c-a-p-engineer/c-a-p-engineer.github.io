---
title: 【GitHub】GitHub Actions での作業ディレクトリの指定方法
date: 2023-11-03T19:30:00+09:00
description: GitHub Actionsを使用する際にコマンドのなどの関係で指定のディレクトリで作業をさせたい時があります。
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions での作業ディレクトリの指定方法
GitHub Actionsを使用する際にコマンドのなどの関係で指定のディレクトリで作業をさせたい時があります。
そんな時、ワークフローの各ステップでコマンドを実行するディレクトリを設定することが可能です。デフォルトのディレクトリ指定とステップごとのディレクトリ指定の2種類の方法を紹介します。

## ステップごとのディレクトリ指定

各ステップで異なるディレクトリを指定する方法は、ステップの独自の作業環境を設定する際に役立ちます。

```yaml
name: Step Specific Directory Workflow

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
      # リポジトリをチェックアウトする

    - name: Install dependencies in backend
      working-directory: ./backend
      # バックエンドディレクトリで依存関係をインストール
      run: npm install

    - name: Build frontend
      working-directory: ./frontend
      # フロントエンドディレクトリでビルドを実行
      run: npm run build
```

## ジョブ全体でのデフォルトディレクトリ指定

ジョブ内のすべてのステップに対してデフォルトの作業ディレクトリを設定する方法です。これにより、すべてのステップが同一のディレクトリ内で実行されます。

```yaml
name: Default Directory Workflow

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./path/to/directory
        # デフォルトの作業ディレクトリを設定

    steps:
    - uses: actions/checkout@v3
      # リポジトリをチェックアウトする

    - name: Run a script
      # デフォルトディレクトリでスクリプトを実行
      run: |
        echo "Running in the default directory"
        ls -l
```

## まとめ

適切な作業ディレクトリの指定は、ワークフローの整理と効率化に不可欠です。ステップごとの指定は柔軟性が高く、デフォルトの指定は設定の簡素化に役立ちます。プロジェクトの要件に応じて適切な方法を選択しましょう。

### 参考リンク

- <a href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsworking-directory" target="_blank" rel="nofollow noopener">jobs.job_id.steps[*].working-directory</a>
- <a href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#defaultsrun" target="_blank" rel="nofollow noopener">defaults.run</a>
