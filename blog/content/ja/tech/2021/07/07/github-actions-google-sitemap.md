---
title: "【GitHub】GitHub Actions で自動的にGoogleにsitemap.xmlを送信する"
date: 2021-07-07T07:00:00+09:00
description: "GitHub Actions で自動的にGoogleにsitemap.xmlを送信するようにしました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# GitHub Actions で自動的にGoogleにsitemap.xmlを送信する
SEO対策のために `sitemap.xml` を GitHub Actions を利用して自動的に送信するように致しました。

## sitemap.xml を送信する
``` yml:.github/workflows/update-sitemap.yml
name: update-sitemap

on:
  schedule:
    - cron: '0 0,12 * * *'

jobs:
  update-sitemap:
    runs-on: ubuntu-latest
    steps:
      - name: Update Google Ping Sitemap
        run: |
          curl -X GET "https://www.google.com/ping?sitemap=https://example.com/sitemap.xml"
          curl -X GET "https://www.google.com/ping?sitemap=https://example2.com/sitemap.xml"
          curl -X GET "https://www.google.com/ping?sitemap=https://example3.com/sitemap.xml"
```
※`cron` の時間は `UTC` なので 日本時間で考えると `-9` 時間されますので注意してください。

## 参考
* <a href="https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=ja" target="_blank" rel="nofollow noopener">サイトマップの作成と送信 | Google 検索セントラル  |  Google Developers</a>
* <a href="https://fwywd.com/tech/ping-sitemap-to-google" target="_blank" rel="nofollow noopener">Google Search Console へのサイトマップの更新通知を GitHub Actions で定期実行しよう | fwywd（フュード）</a>
* <a href="https://docs.github.com/ja/actions/reference/events-that-trigger-workflows#schedule" target="_blank" rel="nofollow noopener">ワークフローをトリガーするイベント - GitHub Docs</a>
