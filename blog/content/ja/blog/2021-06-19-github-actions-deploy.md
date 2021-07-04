---
title: "【Github】Github Actions を利用して Hugo のブログを自動ビルド & 自動コミット"
date: 2021-06-19T02:30:00+09:00
description: "Github Actions を利用して Hugo のブログを自動ビルド & 自動コミットしてみた。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Github
categories: 
- Github
image: images/thumbnail/GitHub_Logo_White.png
---

# 【Github】Github Actions を利用して自動コミット
Github Actions を利用して Hugo を利用している当ブログを自動ビルド & 自動コミットしてみた。

## サンプルコード
Hugoを利用した当ブログを以下の yml を使用して自動的にビルド & コミットするようにしてみました。

``` yml:.github/workflows/build.yml
name: github pages

on: push

jobs:
  deploy:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      # Checkout
      - name: Checkout
        uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      # Setup Hugo
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.83.1'
          extended: true

      # Hugo Build
      - name: Build
        run: |
          cd ./blog
          rm -rf ../docs
          hugo --minify
          mv -fv ./public/ ../docs/

      # Commit
      - name: Update Hugo
        uses: stefanzweifel/git-auto-commit-action@v4.2.0
        with:
          commit_message: Update Build Files
```

最初は戸惑いましたが使用感としてはとても楽。
Github Actions の実行やログもGithub上で確認できます。

## 参考
### Github Actions
* <a href="https://github.co.jp/features/actions" target="_blank" rel="noopener">Actions | Github</a>
* <a href="https://docs.github.com/ja/actions" target="_blank" rel="noopener">GitHub Actionsのドキュメント - GitHub Docs</a>

### Hugo Github Actions
* <a href="https://github.com/peaceiris/actions-hugo" target="_blank" rel="noopener">peaceiris/actions-hugo: GitHub Actions for Hugo ⚡️ Setup Hugo quickly and build your site fast. Hugo extended, Hugo Modules, Linux (Ubuntu), macOS, and Windows are supported.</a>