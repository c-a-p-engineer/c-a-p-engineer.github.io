---
title: "【GitHub Actions】Flutter Web Build を自動化"
date: 2021-08-09T09:00:00+09:00
description: "GitHub Actions で Flutter Web Build を自動化してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
- Flutter
categories: 
- GitHub
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【GitHub Actions】Flutter Web Build を自動化
GitHub Actions で Flutter Web Build を自動化してみました。

## サンプル
サンプルでは `Flutter Web` の build を行っております。

``` yml:.github/workflows/build.yml
name: Flutter Build

on:
  push:
    branches:
      - master

jobs:
  deploy:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Flutter Setup
        uses: subosito/flutter-action@v1
        with:
          flutter-version: '2.0.5'

      - name: Flutter Web Build
        run: |
          flutter pub get
          flutter build web

      # Commit
      - name: Update Flutter Web 
        uses: stefanzweifel/git-auto-commit-action@v4.2.0
        with:
          commit_message: Update Build Files
```

Web以外の build 方法も下記にまとめられています。
<a href="https://github.com/marketplace/actions/flutter-action" target="_blank" rel="nofollow noopener">Flutter action · Actions · GitHub Marketplace</a>

## 参考
* <a href="https://github.com/marketplace/actions/flutter-action" target="_blank" rel="nofollow noopener">Flutter action · Actions · GitHub Marketplace</a>
