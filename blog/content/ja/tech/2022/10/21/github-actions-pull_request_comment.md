---
title: "【GitHub】GitHub Actions プルリクエスト時に実行して結果に合わせてコメントを自動的に入れる"
date: 2022-10-21T18:00:00+09:00
description: "GitHub Actions プルリクエスト時に実行して結果に合わせてコメントを自動的に入れる"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions プルリクエスト時に実行してコメントを自動的に入れる
GitHub Actions プルリクエスト時に実行して結果に合わせてコメントを自動的に入れる

## プルリクエスト時にコメントを入れる
プルリクエストを出した際に実行されます。
実行された結果によってプルリクエストにコメントを付けます。

```yml:.github\workflows\pull_request.yml
name: Pull Request Check

on:
  pull_request:
    # プルリクエスト時の対象ブランチ
    branches:
      - main
      - develop

jobs:
  pr_check:
    name: Pull Request Check
    runs-on: ubuntu-latest
    steps:
    # テストなどを実行（exit 1 でわざとエラー扱いにする
    - name: Run Test
      run: exit 1

    # 成功
    - name: Success
      if: success()
      run: |
        echo '> **Note**' > comments
        echo '> OK' >> comments

    # 失敗
    - name: PHPUnit Failed
      if: failure()
      run: |
        echo '> **Warning**' > comments
        echo '> NG' >> comments

    # プルリクエストにコメントを入れる
    - name: Post comments
      if: always()
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        URL: ${{ github.event.pull_request.html_url }}
      run:
        gh pr comment -F ./comments "${URL}"

```

これを使用することでたとえばプルリクエスト時に自動でテストした結果をプルリクエストのコメントとして残すことが可能になります。
