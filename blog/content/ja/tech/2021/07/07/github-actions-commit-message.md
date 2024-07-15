---
title: "【GitHub】GitHub Actions コミットメッセージ取得"
date: 2021-07-07T06:00:00+09:00
description: "GitHub Actions でコミットメッセージ取得"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# GitHub Actions コミットメッセージ取得
GitHub Actions でコミットメッセージを取得する際のパラメータ
以下のどちらかを使用してください。

```
github.event.head_commit.message
```

```
github.event.commits[0].message
```

## 参考
* <a href="https://stackoverflow.com/questions/63619329/github-action-get-commit-message" target="_blank" rel="nofollow noopener">GitHub Action Get Commit Message - Stack Overflow</a>
* <a href="https://docs.github.com/ja/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push" target="_blank" rel="nofollow noopener">webhook イベントとペイロード - GitHub Docs</a>

