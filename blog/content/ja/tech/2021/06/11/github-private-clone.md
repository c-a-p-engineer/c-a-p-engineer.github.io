---
title: "【GitHub】private リポジトリを clone する"
date: 2021-06-11T17:30:00+09:00
description: "GitHub の private リポジトリを clone する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# private リポジトリを clone する
ちょいちょい忘れるのでメモ。

```
git clone https://{ユーザ名}:{パスワード}@github.com/hoge/for.git
```

ただし二段階認証を設定している場合は通常の GitHub のログインパスワードでは `clone` 出来ません。

GitHub から `token` を発行して対応してください。
<a href="https://qiita.com/kitoko552/items/3f45de6c876c638b690d" target="_blank" rel="nofollow noopener">GitHubに二段階認証を設定した後にGit操作できない時の解決策 - Qita</a>