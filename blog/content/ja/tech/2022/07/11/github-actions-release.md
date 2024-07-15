---
title: "【GitHub】GitHub Actions リリースページを自動的に作る"
date: 2022-07-04T12:00:00+09:00
description: "GitHub Actions リリースページを自動的に作る方法をメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions Debug 設定をする

* <a href="https://github.com/marketplace/actions/create-release" target="_blank" rel="nofollow noopener">Create Release · Actions · GitHub Marketplace</a>

## tag を設定したら自動的にリリースページを作る

Git に `v` が頭についたタグをプッシュした際に作られる公式サンプルです。

```yml:.github\workflows\release.yml
on:
  push:
    tags:
      - 'v*'

name: Create Release

jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            Changes in this Release
            - First Change
            - Second Change
          draft: false
          prerelease: false
```

## 【応用編】 master への Pull Request を merge した際に自動的にリリースページを作る

たとえば `develop` ブランチからリリースするために `master` ブランチへマージを行います。
この際に Pull Request を作成して Pull Request の内容を利用してリリースページを作ることができます。

タグの名前、リリース名は Pull Requestのタイトル名（`${{ github.event.pull_request.title }}`）を利用しているので注意してください。

```yml:.github\workflows\release.yml
name: Release
on:
  pull_request:
    types: [closed]
    branches:
      - master
jobs:
  create_release:
    if: github.event.pull_request.merged == true
    name: create_release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@master
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.event.pull_request.title }}
          release_name: ${{ github.event.pull_request.title }}
          body: ${{ github.event.pull_request.body }}
```

## 参考
* <a href="https://github.com/marketplace/actions/create-release" target="_blank" rel="nofollow noopener">Create Release · Actions · GitHub Marketplace</a>
* <a href="https://zenn.dev/itizawa/articles/b832c4e2a33661" target="_blank" rel="nofollow noopener">GitHub  Actions を使ってリリース時のあれこれを自動化する</a>
