---
title: "【GitHub】GitHub Actions Discord に通知してみる"
date: 2021-07-07T06:30:00+09:00
description: "GitHub Actions を利用して Discord に通知してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# GitHub Actions Discordに通知してみる
`push` された通知など `Discord` に通知してみます。

## Discord の用意
サーバー選択->連携サービス->ウェブフック->新しいウェブフック
ウェブフックを作成後、URLを取得。

## GitHub の用意
取得した URL から `DISCORD_WEBHOOK_ID` と `DISCORD_WEBHOOK_ID` を取得します。

```
https://discordapp.com/api/webhooks/{DISCORD_WEBHOOK_ID}/{DISCORD_WEBHOOK_TOKEN}
````

1.導入したい `Repository` の `Settings`を選択。
2.左のメニューの `Secrets` を指定
3.右上の `New repository secret` を選択。
4.`Name` に `DISCORD_WEBHOOK_ID` を設定。
5.`Value` に取得した `DISCORD_WEBHOOK_ID` を設定。
※ `DISCORD_WEBHOOK_TOKEN` も同様

## GitHub Actionsの設定
GitHub Actions を作成します。
``` yml:.github/workflows/discode.yml
name: Discord

on: push

jobs:
  slack:
    # Ubuntu
    runs-on: ubuntu-latest
    steps:
      # Slack
      - name: Discord Notify
        uses: appleboy/discord-action@0.0.3
        with:
          webhook_id: ${{ secrets.DISCORD_WEBHOOK_ID }}
          webhook_token: ${{ secrets.DISCORD_WEBHOOK_TOKEN }}
          color: "#48f442"
          username: "GitHub Bot"
          args: GitHub Actions Discord Notification ${{ github.event.repository.url }}
```

## 参考
* <a href="https://github.com/appleboy/discord-action" target="_blank" rel="nofollow noopener">appleboy/discord-action: GitHub Action that sends a Discord message.</a>
* <a href="https://qiita.com/toshipon/items/2a1513b584650dcd81c1" target="_blank" rel="nofollow noopener">githubからdiscordに通知をする方法 - Qiita</a>
* <a href="https://docs.github.com/ja/actions/reference/context-and-expression-syntax-for-github-actions" target="_blank" rel="nofollow noopener">GitHub Actions のコンテキストおよび式の構文 - GitHub Docs</a>

