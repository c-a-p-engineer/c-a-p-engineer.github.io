---
title: "【GitHub】GitHub Actions を利用して成果物を保存する"
date: 2021-06-19T02:30:00+09:00
description: "GitHub Actions を利用して成果物を保存する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# GitHub Actions を利用して成果物を保存する
GitHub Actions でテストをした時などログが出るかと思います。
そういった成果物などをコミットするとブランチが汚れるしわざわざSlackなどに送るのも面倒。
なので一時的にGitHubにアップする事が可能なのです。

## サンプルコード
サンプルは `test/*` という名称のブランチでしか発動しないので気をつけてください。

``` yml:.github/workflows/artifact.yml
# Workflow
name: upload-artifact-sample

on:
  # 発動条件 push
  push:
    # 発動ブランチ test/*
    branches:
      - test/*

# JOB
jobs:
  artifact-sample:
    runs-on: ubuntu-latest
    steps:
      # 成果用としてアップロードするファイルを作成
      - name: artifact output
        id: rnd
        run: |
          echo "Hello, World" > hello.txt
      # 成果物アップロード
      - name: artifact upload
        uses: actions/upload-artifact@v2.2.0
        with:
          # 保存ファイル名（name.zip）
          name: hello
          # 保存するファイル
          path: hello.txt
          # 保存期間（日）
          retention-days: 3
```

対象のリポジトリ > Actions > 対象の「Action」 > 画面下部に「Artifacts」 ありますので、そこからダウンロードが可能です。

## 参考
* <a href="https://docs.github.com/ja/actions/advanced-guides/storing-workflow-data-as-artifacts" target="_blank" rel="nofollow noopener">ワークフロー データを成果物として保存する - GitHub Docs</a>
